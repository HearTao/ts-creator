class A {}

interface B {
  c: number
  option?: number
  func?: (a: this) => void
}

enum EN {}

type C = A | B

type D = A & B

type E = (A & B) | A

type F<T, U = T & E> = U

type G<T extends D> = T & E

declare const f: A

const g = f as B

const n: number = g.option!

function thisParam(this: number, a: string | number): a is number {
  return true
}

const h = <A>g

type FF = typeof h

type BC = B['c']

type L1 = true

type L2 = false

type L3 = 1

type L4 = ''

type L5 = 'a'

type A1 = string[]

type A2 = string[][]

type A3 = [string, number]

type T1 = null

type T2 = undefined

type Index = {
  [a: string]: string
}

type Mapped<T> = { [P in keyof T]: T[P] }

type Cond<T, U = T extends (infer P)[] ? P : never> = U

type Nullable<T> = { [P in keyof T]: T[P] | null }

type Partial1<T> = { [P in keyof T]?: T[P] }

type Readonly1<T> = { readonly [P in keyof T]: T[P] }

type ImportType = import('typescript').Identifier

type Whatever = [number, string?, boolean?, ...number[]]

type Unknown = unknown

type Any = any

type MutableRequired<T> = { -readonly [P in keyof T]-?: T[P] }

type ReadonlyPartial<T> = { +readonly [P in keyof T]+?: T[P] }
