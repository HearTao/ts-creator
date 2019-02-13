class A {}

interface B {
  c: number
}

enum EN {}

type C = A | B

type D = A & B

type E = (A & B) | A

type F<T, U = T & E> = U

type G<T extends D> = T & E

declare const f: A

const g = f as B

const h = <A>g

type FF = typeof h

type BC = B['c']

type L1 = true

type L2 = false

type L3 = 1

type L4 = ''

type L5 = 'a'
