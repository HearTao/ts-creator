import { TokenFlags } from 'typescript'

declare module 'typescript' {
  interface NumericLiteral {
    numericLiteralFlags: TokenFlags
  }
}
