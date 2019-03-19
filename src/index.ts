import { transformSourceFile, transformNode, transformSourceFileChildren } from './transformer'
import {
  createPrinter,
  createSourceFile,
  ScriptTarget,
  SourceFile,
  ScriptKind
} from 'typescript'

import * as prettier from 'prettier/standalone'
import tsPlugin from 'prettier/parser-typescript'
import { resolveRunnable } from './wrapper/runnable'
import { resolveESModule } from './wrapper/esmodule'
import { resolveCJSModule } from './wrapper/commonjs'

export enum CreatorTarget {
  none = 'none',
  expression = 'expression',
  runnable = 'runnable',
  esmodule = 'esmodule',
  commonjs = 'commonjs'
}

export interface Options {
  prettierOptions?: prettier.Options
  target?: CreatorTarget
  tsx?: boolean
}

const defaultPrettierOptions: prettier.Options = {
  parser: 'typescript',
  plugins: [tsPlugin],
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  proseWrap: 'preserve'
}

function transformNone(file: SourceFile): SourceFile {
  return transformSourceFileChildren(file)
}

function transformRunable(file: SourceFile): SourceFile {
  return resolveRunnable(transformNode(file))
}

function transformExpression(file: SourceFile): SourceFile {
  return transformSourceFile(file)
}

function transformESModule(file: SourceFile): SourceFile {
  return resolveESModule(transformNode(file))
}

function transformCJSModule(file: SourceFile): SourceFile {
  return resolveCJSModule(transformNode(file))
}

function transformTarget(file: SourceFile, options: Options): SourceFile {
  switch (options.target) {
    case CreatorTarget.runnable:
      return transformRunable(file)
    case CreatorTarget.esmodule:
      return transformESModule(file)
    case CreatorTarget.commonjs:
      return transformCJSModule(file)
    case CreatorTarget.expression:
      return transformExpression(file)
    default:
      return transformNone(file)
  }
}

function createTemporaryFile(code: string, options: Options) {
  if (options.tsx) {
    return createSourceFile(
      'temporary.tsx',
      code,
      ScriptTarget.Latest,
      undefined,
      ScriptKind.TSX
    )
  }
  return createSourceFile('temporary.ts', code, ScriptTarget.Latest)
}

export default function create(code: string, options: Options = {}): string {
  const printer = createPrinter()

  const file = createTemporaryFile(code, options)

  const factoryFile = transformTarget(file, options)
  const factoryCode = printer.printFile(factoryFile)

  const prettierOptions = {
    ...defaultPrettierOptions,
    ...options.prettierOptions
  }
  return prettier.format(factoryCode, prettierOptions)
}

export { transformNode, transformSourceFile } from './transformer'
