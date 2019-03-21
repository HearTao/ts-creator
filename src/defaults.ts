import * as prettier from 'prettier/standalone'
import tsPlugin from 'prettier/parser-typescript'
import { Options } from './types'

export function getDefaultPrettierOptions(): prettier.Options {
  return {
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
}

export function getDefaultOptions(): Options {
  return {
    stripSemi: true
  }
}
