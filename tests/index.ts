import * as fs from 'fs'
import creator from '../src'

const code = fs.readFileSync('./src/index.ts').toString()
const newCode = creator(code)

console.log(`succeed: ${newCode.length} chars generated`)
