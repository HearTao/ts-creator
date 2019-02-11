import { transformSourceFile, transformNode } from './transformer'
import {
  createPrinter,
  createSourceFile,
  ScriptTarget,
  SourceFile
} from 'typescript'

import * as prettier from 'prettier/standalone'
import tsPlugin from 'prettier/parser-typescript'
import { resolveRunnable } from './runnable'

export enum CreatorTarget {
  expression = 'expression',
  runnable = 'runnable'
}

export interface Options {
  prettierOptions?: prettier.Options
  target?: CreatorTarget
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

function transformRunable(file: SourceFile): SourceFile {
  return resolveRunnable(transformNode(file))
}

function transformExpression(file: SourceFile): SourceFile {
  return transformSourceFile(file)
}

function transformTarget(file: SourceFile, options: Options): SourceFile {
  switch (options.target) {
    case CreatorTarget.runnable:
      return transformRunable(file)
    default:
      return transformExpression(file)
  }
}

export default function create(code: string, options: Options = {}): string {
  const printer = createPrinter()
  const file = createSourceFile('templory.ts', code, ScriptTarget.Latest)

  const factoryFile = transformTarget(file, options)
  const factoryCode = printer.printFile(factoryFile)

  const prettierOptions = {
    ...defaultPrettierOptions,
    ...options.prettierOptions
  }
  return prettier.format(factoryCode, prettierOptions)
}

export { transformNode, transformSourceFile } from './transformer'
