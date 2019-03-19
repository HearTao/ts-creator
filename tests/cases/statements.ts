1
const a = 1
if (true) {
}

do {} while (false)

while (false) {}

for (let i = 0; i <= 0; ++i) {}

for (let i in []) {
}

for (let i of []) {
}

while (false) {
  continue
}

while (false) {
  break
}

function foo() {
  return 0
}

try {
  throw new Error()
} catch (e) {}

debugger

label: while (false) {
  break label
}

label: while (false) {
  continue label
}

function switchStatement(aaa: string) {
  switch (aaa) {
    case 'a':
      return 1
    case 'b':
      return 2
    case 'c':
      break
    case 'e':
    case 'f':
      return 3
    case 'g':
    default:
      return 4
  }
  return undefined
}

with ({}) {
}

{
}
