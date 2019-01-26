<div align="center">
  <img width="520" src="./media/Logo.svg">
  
  # ts-creator 
  
  A code generator to generate TypeScript code generator from TypeScript code

  [![Build Status](https://travis-ci.com/HearTao/ts-creator.svg?branch=master)](https://travis-ci.com/HearTao/ts-creator)  [![NPM version](https://img.shields.io/npm/v/ts-creator.svg)](https://www.npmjs.com/package/ts-creator)

  👉 [Try It!](https://ts-creator.js.org/) 👈
</div>


## How to use it:

```shell
npm install ts-creator
```


### 1. generate from code

```ts
import creator from 'ts-creator'

const generatedFactoryCode = creator(`const foo = "your code here"`)
```

### 2. transform source file

```ts
import { transformSourceFile } from 'ts-creator'

declare const file: ts.SourceFile
const factoryFile = transformSourceFile(file)
```

### 3. transform node

```ts
import { transformNode } from 'ts-creator'

declare const node: ts.Expression
const factoryNode = transformNode(node)
```

## How does it work?

If you want to write a TypeScript codegen.

You got TypeScript code: 

```ts
function foo(bar: number): number {
  return bar + 1
}
```

ts-creator generate TypeScript factory from given code to:

```ts
ts.createFunctionDeclaration(
  undefined,
  undefined,
  undefined,
  ts.createIdentifier('foo'),
  undefined,
  [
    ts.createParameter(
      undefined,
      undefined,
      undefined,
      ts.createIdentifier('bar'),
      undefined,
      ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
      undefined
    )
  ],
  ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
  ts.createBlock(
    [
      ts.createReturn(
        ts.createBinary(
          ts.createIdentifier('bar'),
          ts.createToken(ts.SyntaxKind.PlusToken),
          ts.createNumericLiteral('1')
        )
      )
    ],
    true
  )
)

```

Result after run the generated factory code: 

```ts
function foo(bar: number): number {
    return bar + 1;
}
```

## Cli usage

Use `ts-creator` cli to generate code:

```sh
ts-creator <input> [options]
```

Simple usage:

```sh
# print generate code
ts-creator foo.ts

# or read data from pipeline
echo 42 | ts-creator
cat foo.ts | ts-creator
ts-creator < foo.ts

# write to file
ts-creator foo.ts -o foo.js
ts-creator foo.ts > foo.js
```

### Installation

You can install `ts-creator` globally.

```sh
npm i -g ts-creator
# or yarn
yarn global add ts-creator
```

If you install locally, may prepend `npx` or `yarn` you need. 

```sh
# use npm
npm i ts-creator
npx ts-creator -h

# use yarn
yarn add ts-creator
yarn ts-creator -h
```

### Cli options

| option | description | type | default |
|---|---|---|---|
| --color | colorful print | boolean | false |
| --output, -o | output to filepath | string | undefined |
| --version, -v | show ts-creator version | boolean | false |
| --help, -h | show help | boolean | false |


## TODO:

- [ ] JSDoc
