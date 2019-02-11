import * as fs from 'fs'
import creator, { CreatorTarget } from '../src'

const code = fs.readFileSync('./src/index.ts').toString()
const newCode = creator(code, { target: CreatorTarget.runnable })

console.log(`succeed: ${newCode.length} chars generated`)
