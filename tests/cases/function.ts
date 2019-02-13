function func() {}
function ffunc(a: number, b: string) {}
function fffunc() {
  return 1
}

const ffffunc = () => {}
const fffffunc = (a: any) => {}
const ffffffunc = () => {
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
function FA() {
  function FB() {
    function FC() {}
    FC()
  }
  FB()
}
FA()

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
