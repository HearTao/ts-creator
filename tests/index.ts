import * as ts from 'typescript'
import fs from 'fs'
import * as creator from '../src'

const code = fs.readFileSync('./src/index.ts').toString()

const printer = ts.createPrinter()
const file = ts.createSourceFile('test.ts', code, ts.ScriptTarget.Latest)

const newFile = creator.transformSourceFile(file)

console.log(printer.printFile(newFile))