function foooo(a: any) {
  delete a.a
  typeof a.b
  return a.c ? a.d : a.e
}

async function asyncFoo() {
  await new Promise(function() {})
}

function* generatorFoo() {
  yield 1
  return 2
}

function fooo(...a: any[]) {}
fooo``
