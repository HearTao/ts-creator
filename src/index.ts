import {
  transformSourceFile,
  transformNode,
  transformSourceFileChildren
} from './transformer'
import {
  createPrinter,
  createSourceFile,
  ScriptTarget,
  SourceFile,
  ScriptKind
} from 'typescript'

import * as prettier from 'prettier/standalone'
import { resolveRunnable } from './wrapper/runnable'
import { resolveESModule } from './wrapper/esmodule'
import { resolveCJSModule } from './wrapper/commonjs'
import { getDefaultOptions, getDefaultPrettierOptions } from './defaults'
import { CreatorTarget, Options } from './types'

/* istanbul ignore next */
function transformNone(file: SourceFile): SourceFile {
  return transformSourceFileChildren(file)
}

/* istanbul ignore next */
function transformRunable(file: SourceFile): SourceFile {
  return resolveRunnable(transformNode(file))
}

/* istanbul ignore next */
function transformExpression(file: SourceFile): SourceFile {
  return transformSourceFile(file)
}

function transformESModule(file: SourceFile): SourceFile {
  return resolveESModule(transformNode(file))
}

/* istanbul ignore next */
function transformCJSModule(file: SourceFile): SourceFile {
  return resolveCJSModule(transformNode(file))
}

function transformTarget(file: SourceFile, options: Options): SourceFile {
  switch (options.target) {
    /* istanbul ignore next */
    case CreatorTarget.runnable:
      return transformRunable(file)
    case CreatorTarget.esmodule:
      return transformESModule(file)
    /* istanbul ignore next */
    case CreatorTarget.commonjs:
      return transformCJSModule(file)
    /* istanbul ignore next */
    case CreatorTarget.expression:
      return transformExpression(file)
    /* istanbul ignore next */
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

export default function create(
  code: string,
  options: Options = getDefaultOptions()
): string {
  const printer = createPrinter()

  const file = createTemporaryFile(code, options)

  const factoryFile = transformTarget(file, options)
  const factoryCode = printer.printFile(factoryFile)

  const prettierOptions = {
    ...getDefaultPrettierOptions(),
    ...options.prettierOptions
  }
  let result = prettier.format(factoryCode, prettierOptions)

  /* istanbul ignore next */
  if (options.stripSemi && result.startsWith(';')) {
    result = result.substring(1)
  }
  return result
}

export { transformNode, transformSourceFile } from './transformer'
