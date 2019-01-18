///<reference path="../types/prettier.d.ts"/>

import { transformSourceFile } from './transformer'
import { isDef } from './utils'
import { Options as PrettierOptions, format } from 'prettier'
import { createPrinter, createSourceFile, ScriptTarget } from 'typescript'

// if standalone, that is external module, otherwise undefined
import tsPlugin from 'prettier-typescript-plugins'

export interface Options {
  prettierOptions?: Options
}

const defaultPrettierOptions: PrettierOptions = {
  parser: 'typescript',
  plugins: [tsPlugin].filter(isDef),
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  proseWrap: 'preserve'
}

export default function create(code: string, options: Options = {}): string {
  const printer = createPrinter()
  const file = createSourceFile('templory.ts', code, ScriptTarget.Latest)
  const factoryFile = transformSourceFile(file)
  const factoryCode = printer.printFile(factoryFile)

  const prettierOptions = {
    ...defaultPrettierOptions,
    ...options.prettierOptions
  }
  return format(factoryCode, prettierOptions)
}

export { transformNode, transformSourceFile } from './transformer'
