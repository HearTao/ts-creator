import * as ts from 'typescript'
import { transformSourceFile } from './transformer'
import { Options as PrettierOptions, Plugin } from 'prettier'

export interface Options {
  prettierOptions?: Options
}

interface PrettierNamespace {
  format: (source: string, options?: PrettierOptions) => string
}

const prettier: PrettierNamespace = require('prettier/standalone')
const prettierTS: Plugin = require('prettier/parser-typescript')

const defaultPrettierOptions: PrettierOptions = {
  parser: 'typescript',
  plugins: [prettierTS],
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
  const printer = ts.createPrinter()
  const file = ts.createSourceFile('templory.ts', code, ts.ScriptTarget.Latest)
  const factoryFile = transformSourceFile(file)
  const factoryCode = printer.printFile(factoryFile)

  const prettierOptions = {
    ...defaultPrettierOptions,
    ...options.prettierOptions
  }
  return prettier.format(factoryCode, prettierOptions)
}

export { transformNode, transformSourceFile } from './transformer'
