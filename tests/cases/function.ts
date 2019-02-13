function f() {}
function ff(a: number, b: string) {}
function fff() {
  return 1
}

const ffff = () => {}
const fffff = (a: any) => {}
const ffffff = () => {
  return 0
}
;(function() {})()
;(() => {})()
;-(function() {})()
;+(function() {})()
~(function() {})()
void (function() {})()
;(function namedIIFE() {})()
;(function(a: number, b: string) {})(2333, 'Hello!')
function nested(age: number) {
  function oh() {}
}
function A() {
  function B() {
    function C() {}
    C()
  }
  B()
}
A()

const getter = (function getSomething() {
  const something = 'hahaha'
  return function() {
    return something
  }
})()

getter()

function args(...args: any[]) {}

let myAdd: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y
}

function any(arg: any): any {
  return arg
}
