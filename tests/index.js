const ts = require('typescript')
const printer = ts.createPrinter()
const file = ts.createSourceFile('test.tsx', '', ts.ScriptTarget.Latest)

const node = ts.createFunctionDeclaration(undefined, undefined, undefined, ts.createIdentifier("a"), undefined, [], ts.createToken(ts.SyntaxKind.NumberKeyword), ts.createBlock([ts.createExpressionStatement(ts.createCall(ts.createPropertyAccess(ts.createIdentifier("console"), ts.createIdentifier("log")), undefined, [ts.createNumericLiteral("1")]))], true))
const newFile = ts.updateSourceFileNode(file, [node])

console.log(printer.printFile(newFile))