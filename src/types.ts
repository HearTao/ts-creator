import * as prettier from 'prettier/standalone'

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
  stripSemi?: boolean
}
