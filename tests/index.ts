import * as ts from 'typescript'
import prettier from 'prettier'
import fs from 'fs'
import * as creator from '../src'
import prettierOptions from '../prettier.json'

const code = fs.readFileSync('./src/index.ts').toString()

const printer = ts.createPrinter()
const file = ts.createSourceFile('test.ts', code, ts.ScriptTarget.Latest)

const newFile = creator.transformSourceFile(file)

const newCode = printer.printFile(newFile)

const betterCode = prettier.format(newCode, prettierOptions as prettier.Options)

console.log(betterCode)
