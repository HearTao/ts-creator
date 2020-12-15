import { formatFlags } from './utils'
import {
  Identifier,
  createPropertyAccess,
  createIdentifier,
  Expression,
  createCall,
  LiteralLikeNode,
  createStringLiteral,
  BinaryOperator,
  createBinary,
  NodeFlags,
  SyntaxKind,
  createTrue,
  createFalse
} from 'typescript'

/** @internal */
export function createTsAccess(id: Identifier) {
  return createPropertyAccess(createIdentifier('ts'), id)
}

/** @internal */
export function createTsCall(id: string, args?: Expression[]) {
  return createCall(createTsAccess(createIdentifier(id)), undefined, args)
}

/** @internal */
export function createLiteralCall(node: LiteralLikeNode, func: string) {
  return createTsCall(func, [createStringLiteral(node.text)])
}

function connectBinary(op: BinaryOperator, nodes: Expression[]): Expression {
  if (nodes.length === 0) {
    return createIdentifier('undefined')
  }
  if (nodes.length === 1) {
    return nodes[0]
  }
  return createBinary(nodes[0], op, connectBinary(op, nodes.slice(1)))
}

// NodeFlags.PossiblyContainsDynamicImport, NodeFlags.PossiblyContainsImportMeta, NodeFlags.Ambient, NodeFlags.InWithStatement
const internalFlags: number = (1 << 19) | (1 << 20) | (1 << 22) | (1 << 23)
function filterInternalFlags(flags: NodeFlags): NodeFlags {
  return (flags &= ~internalFlags)
}

/** @internal */
export function transformInternalSyntaxKind(syntaxKind: string) {
  switch (syntaxKind) {
    case 'FirstContextualKeyword':
      return 'AbstractKeyword'
    case 'LastContextualKeyword':
      return 'OfKeyword'
    default:
      return syntaxKind
  }
}

/** @internal */
export function createNodeFlags(flags: NodeFlags) {
  const formattedFlags = formatFlags(
    filterInternalFlags(flags),
    NodeFlags
  ).map(f =>
    createPropertyAccess(
      createTsAccess(createIdentifier('NodeFlags')),
      createIdentifier(f)
    )
  )
  return connectBinary(SyntaxKind.BarToken, formattedFlags)
}

/** @internal */
export function createBooleanLiteral(bool: boolean | undefined) {
  if (bool === undefined) {
    return createIdentifier('undefined')
  }
  return bool ? createTrue() : createFalse()
}
