# ts-creator 

A code generator to generate TypeScript code generator from TypeScript code

[![Build Status](https://travis-ci.com/HearTao/ts-creator.svg?branch=master)](https://travis-ci.com/HearTao/ts-creator)

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
ts.updateSourceFileNode(
  ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest),
  [
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
          ts.createToken(ts.SyntaxKind.NumberKeyword),
          undefined
        )
      ],
      ts.createToken(ts.SyntaxKind.NumberKeyword),
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
  ]
)

```

Result after run the generated factory code: 

```ts

function foo(bar: number): number {
    return bar + 1;
}

```

### TODO:

- [ ] JSDoc
- [ ] Jsx
