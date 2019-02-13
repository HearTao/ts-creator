function generics<T>(arg: T): T {
  return arg
}
generics(123)
generics<any[]>([])
generics<string>('Hello')

function generics2<T>(arg: T[]): T[] {
  return arg
}
generics2<number>([123, 456])

function generics3<T>(arg: T): T {
  return arg
}
let gv: <U>(arg: U) => U = generics3

interface GenericIdentityFn<T> {
  (arg: T): T
}

function generics4<T>(arg: T): T {
  return arg
}
let gvv: GenericIdentityFn<number> = generics4

class GenericNumber<T> {
  zeroValue!: T
  add!: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y
}

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 }
getProperty(x, 'a')

interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  return arg
}
loggingIdentity({ length: 10, value: 3 })

function getProperty2<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x2 = { a: 1, b: 2, c: 3, d: 4 }
getProperty(x2, 'a')

function create<T>(c: { new (): T }): T {
  return new c()
}

class BeeKeeper {
  hasMask!: boolean
}

class ZooKeeper {
  nametag!: string
}

class Animal {
  numLegs!: number
}

class Bee extends Animal {
  keeper!: BeeKeeper
}

class Lion extends Animal {
  keeper!: ZooKeeper
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask
