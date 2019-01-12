import * as ts from 'typescript'
import { formatFlags } from './utils';

export function createTsAccess(id: ts.Identifier) {
  return ts.createPropertyAccess(ts.createIdentifier('ts'), id);
}

export function createTsCall(id: string, args?: ts.Expression[]) {
  return ts.createCall(createTsAccess(ts.createIdentifier(id)), undefined, args);
}

export function createLiteralCall(node: ts.LiteralLikeNode, func: string) {
  return createTsCall(func, [ts.createStringLiteral(node.text)]);
}

function connectBinary(op: ts.BinaryOperator, nodes: ts.Expression[]): ts.Expression {
  if (nodes.length === 0) {
    return ts.createIdentifier('undefined');
  }
  if (nodes.length === 1) {
    return nodes[0];
  }
  return ts.createBinary(nodes[0], op, connectBinary(op, nodes.slice(1)));
}

export function createNodeFlags(flags: ts.NodeFlags) {
  const formattedFlags = formatFlags(flags, ts.NodeFlags).map(f => ts.createPropertyAccess(createTsAccess(ts.createIdentifier('NodeFlags')), ts.createIdentifier(f)));
  return connectBinary(ts.SyntaxKind.BarBarToken, formattedFlags);
}

export function createBooleanLiteral(bool: boolean | undefined) {
  if (bool === undefined) {
    return ts.createIdentifier('undefined');
  }
  return bool ? ts.createTrue() : ts.createFalse();
}
