import * as ts from 'typescript'

const sourceFile = ts.createSourceFile("1.tsx", `fuck([1, 2, 3])`, ts.ScriptTarget.Latest)
const printer = ts.createPrinter()

function createTsAccess(id: ts.Identifier) {
  return ts.createPropertyAccess(ts.createIdentifier('ts'), id)
}

function createTsCall(id: string, args?: ts.Expression[]) {
  return ts.createCall(createTsAccess(ts.createIdentifier(id)), undefined, args)
}

function createLiteral(node: ts.LiteralLikeNode, func: string) {
  return createTsCall(
    func,
    [ts.createStringLiteral(node.text)]
  )
}

function createBooleanLiteral(bool: boolean | undefined) {
  if (bool === undefined) {
    return ts.createIdentifier('undefined')
  }

  return bool ? ts.createTrue() : ts.createFalse()
}

interface QuestionOrExclamation {
  questionToken?: ts.QuestionToken
  exclamationToken?: ts.ExclamationToken
}

function transformSourceFile(sourceFile: ts.SourceFile): ts.SourceFile {
  return ts.updateSourceFileNode(sourceFile, ts.visitNodes(sourceFile.statements, transformVisitor));

  function transformSyntaxKind(kind: ts.SyntaxKind) {
    return ts.createPropertyAccess(
      createTsAccess(
        ts.createIdentifier('SyntaxKind'),
      ),
      ts.createIdentifier(ts.SyntaxKind[kind])
    )
  }

  function transformVisitorQuestionOrExclamation(node: QuestionOrExclamation) {
    if (node.questionToken) {
      return transformVisitor(node.questionToken)
    } else if (node.exclamationToken) {
      return transformVisitor(node.exclamationToken)
    } else {
      return ts.createIdentifier('undefined')
    }
  }

  function transformVisitors(nodes?: ts.NodeArray<ts.Node>): ts.Expression {
    if (!nodes) {
      return ts.createIdentifier('undefined')
    }
    return ts.createArrayLiteral(nodes.map(transformVisitor))
  }

  function transformVisitor(node?: ts.Node): ts.Expression {
    if (!node) {
      return ts.createIdentifier('undefined')
    }

    switch (node.kind) {
      case ts.SyntaxKind.QuestionToken:
      case ts.SyntaxKind.ExclamationToken:
      case ts.SyntaxKind.AsteriskToken:
      case ts.SyntaxKind.ReadonlyKeyword:
      case ts.SyntaxKind.PlusToken:
      case ts.SyntaxKind.MinusToken:
      case ts.SyntaxKind.DotDotDotToken:
        return createToken(node)

      case ts.SyntaxKind.NumericLiteral:
        return createNumericLiteral(node as ts.NumericLiteral)
      case ts.SyntaxKind.BigIntLiteral:
        return BigIntLiteral(node as ts.BigIntLiteral)
      case ts.SyntaxKind.StringLiteral:
        return createStringLiteral(node as ts.StringLiteral)
      case ts.SyntaxKind.RegularExpressionLiteral:
        return createRegularExpressionLiteral(node as ts.RegularExpressionLiteral)
      case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        return createNoSubstitutionTemplateLiteral(node as ts.NoSubstitutionTemplateLiteral)
      case ts.SyntaxKind.TemplateHead:
        return createTemplateHead(node as ts.TemplateHead)
      case ts.SyntaxKind.TemplateMiddle:
        return createTemplateMiddle(node as ts.TemplateMiddle)
      case ts.SyntaxKind.TemplateTail:
        return createTemplateTail(node as ts.TemplateTail)
      case ts.SyntaxKind.Identifier:
        return createIdentifier(node as ts.Identifier)
      case ts.SyntaxKind.QualifiedName:
        return createQualifiedName(node as ts.QualifiedName)
      case ts.SyntaxKind.ComputedPropertyName:
        return createComputedPropertyName(node as ts.ComputedPropertyName)
      case ts.SyntaxKind.TypeParameter:
        return createTypeParameter(node as ts.TypeParameterDeclaration)
      case ts.SyntaxKind.Parameter:
        return createParameter(node as ts.ParameterDeclaration)
      case ts.SyntaxKind.Decorator:
        return createDecorator(node as ts.Decorator)
      case ts.SyntaxKind.PropertySignature:
        return createPropertySignature(node as ts.PropertySignature)
      case ts.SyntaxKind.PropertyDeclaration:
        return createPropertyDeclaration(node as ts.PropertyDeclaration)
      case ts.SyntaxKind.MethodSignature:
        return createMethodSignature(node as ts.MethodSignature)
      case ts.SyntaxKind.MethodDeclaration:
        return createMethodDeclaration(node as ts.MethodDeclaration)
      case ts.SyntaxKind.Constructor:
        return createConstructor(node as ts.ConstructorDeclaration)
      case ts.SyntaxKind.ConstructSignature:
        return createConstructSignature(node as ts.ConstructSignatureDeclaration)
      case ts.SyntaxKind.IndexSignature:
        return createIndexSignature(node as ts.IndexSignatureDeclaration)
      case ts.SyntaxKind.TypePredicate:
        return createTypePredicate(node as ts.TypePredicateNode)
      case ts.SyntaxKind.TypeReference:
        return createTypeReference(node as ts.TypeReferenceNode)
      case ts.SyntaxKind.FunctionType:
        return createFunctionType(node as ts.FunctionTypeNode)
      case ts.SyntaxKind.ConstructorType:
        return createConstructorType(node as ts.ConstructorTypeNode)
      case ts.SyntaxKind.TypeQuery:
        return createTypeQuery(node as ts.TypeQueryNode)
      case ts.SyntaxKind.TypeLiteral:
        return createTypeLiteral(node as ts.TypeLiteralNode)
      case ts.SyntaxKind.ArrayType:
        return createArrayType(node as ts.ArrayTypeNode)
      case ts.SyntaxKind.TupleType:
        return createTypleType(node as ts.TupleTypeNode)
      case ts.SyntaxKind.OptionalType:
        return createOptionalType(node as ts.OptionalTypeNode)
      case ts.SyntaxKind.RestType:
        return createRestType(node as ts.RestTypeNode)
      case ts.SyntaxKind.UnionType:
        return createUnionType(node as ts.UnionTypeNode)
      case ts.SyntaxKind.IntersectionType:
        return createIntersectionType(node as ts.IntersectionTypeNode)
      case ts.SyntaxKind.ConditionalType:
        return createConditionalType(node as ts.ConditionalTypeNode)
      case ts.SyntaxKind.InferType:
        return createInferType(node as ts.InferTypeNode)
      case ts.SyntaxKind.ParenthesizedType:
        return createParenthesizedType(node as ts.ParenthesizedTypeNode)
      case ts.SyntaxKind.ThisType:
        return createThisType(node as ts.ThisTypeNode)
      case ts.SyntaxKind.TypeOperator:
        return createTypeOperator(node as ts.TypeOperatorNode)
      case ts.SyntaxKind.IndexedAccessType:
        return createIndexedAccessType(node as ts.IndexedAccessTypeNode)
      case ts.SyntaxKind.MappedType:
        return createMappedType(node as ts.MappedTypeNode)
      case ts.SyntaxKind.LiteralType:
        return createLiteralType(node as ts.LiteralTypeNode)
      case ts.SyntaxKind.ImportType:
        return createImportType(node as ts.ImportTypeNode)
      case ts.SyntaxKind.ObjectBindingPattern:
        return createObjectBindingPattern(node as ts.ObjectBindingPattern)
      case ts.SyntaxKind.ArrayBindingPattern:
        return createArrayBindingPattern(node as ts.ArrayBindingPattern)
      case ts.SyntaxKind.BindingElement:
        return createBindingElement(node as ts.BindingElement)
      case ts.SyntaxKind.ArrayLiteralExpression:
        return createArrayLiteralExpression(node as ts.ArrayLiteralExpression)
      case ts.SyntaxKind.ObjectLiteralExpression:
        return createObjectLiteralExpression(node as ts.ObjectLiteralExpression)
      case ts.SyntaxKind.PropertyAccessExpression:
        return createPropertyAccessExpression(node as ts.PropertyAccessExpression)
      case ts.SyntaxKind.ElementAccessExpression:
        return createElementAccessExpression(node as ts.ElementAccessExpression)
      case ts.SyntaxKind.CallExpression:
        return createCallExpression(node as ts.CallExpression)
      case ts.SyntaxKind.NewExpression:
        return createNewExpression(node as ts.NewExpression)
      case ts.SyntaxKind.TaggedTemplateExpression:
        return createTaggedTemplateExpression(node as ts.TaggedTemplateExpression)
      case ts.SyntaxKind.TypeAssertionExpression:
        return createTypeAssertionExpression(node as ts.TypeAssertion)

      case ts.SyntaxKind.ExpressionStatement:
        return createExpressionStatement(node as ts.ExpressionStatement)
      case ts.SyntaxKind.JsxText:
        throw new Error("unknown syntax")
      default:
        throw new Error("unsupported syntax")
    }
  }

  function createTypeAssertionExpression(node: ts.TypeAssertion) {
    return createTsCall(
      'createTypeAssertion',
      [
        transformVisitor(node.type),
        transformVisitor(node.expression),
      ]
    )
  }

  function createTaggedTemplateExpression(node: ts.TaggedTemplateExpression) {
    return createTsCall(
      'createTaggedTemplate',
      [
        transformVisitor(node.tag),
        transformVisitor(node.template),
      ]
    ) 
  }

  function createNewExpression(node: ts.NewExpression) {
    return createTsCall(
      'createNew',
      [
        transformVisitor(node.expression),
        transformVisitors(node.typeArguments),
        transformVisitors(node.arguments),
      ]
    ) 
  }

  function createCallExpression(node: ts. CallExpression) {
    return createTsCall(
      'createCall',
      [
        transformVisitor(node.expression),
        transformVisitors(node.typeArguments),
        transformVisitors(node.arguments),
      ]
    ) 
  }

  function createElementAccessExpression(node: ts.ElementAccessExpression) {
    return createTsCall(
      'createElementAccess',
      [
        transformVisitor(node.expression),
        transformVisitor(node.argumentExpression),
      ]
    )  
  }

  function createPropertyAccessExpression(node: ts.PropertyAccessExpression) {
    return createTsCall(
      'createPropertyAccess',
      [
        transformVisitor(node.expression),
        transformVisitor(node.name),
      ]
    )  
  }

  function createObjectLiteralExpression(node: ts.ObjectLiteralExpression) {
    return createTsCall(
      'createObjectLiteral',
      [
        transformVisitors(node.properties),
        createBooleanLiteral(false)
      ]
    )  
  }

  function createArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
    return createTsCall(
      'createArrayLiteral',
      [
        transformVisitors(node.elements),
        createBooleanLiteral(false)
      ]
    ) 
  }

  function createBindingElement(node: ts.BindingElement) {
    return createTsCall(
      'createBindingElement',
      [
        transformVisitor(node.dotDotDotToken),
        transformVisitor(node.propertyName),
        transformVisitor(node.name),
        transformVisitor(node.initializer),
      ]
    ) 
  }

  function createArrayBindingPattern(node: ts.ArrayBindingPattern) {
    return createTsCall(
      'createArrayBindingPattern',
      [
        transformVisitors(node.elements),
      ]
    ) 
  }

  function createObjectBindingPattern(node: ts.ObjectBindingPattern) {
    return createTsCall(
      'createObjectBindingPattern',
      [
        transformVisitors(node.elements),
      ]
    ) 
  }

  function createImportType(node: ts.ImportTypeNode) {
    return createTsCall(
      'createImportTypeNode',
      [
        transformVisitor(node.argument),
        transformVisitor(node.qualifier),
        transformVisitors(node.typeArguments),
        createBooleanLiteral(node.isTypeOf),
      ]
    ) 

  }

  function createLiteralType(node: ts.LiteralTypeNode) {
    return createTsCall('createLiteralTypeNode', [transformVisitor(node.literal)]) 
  }

  function createMappedType(node: ts.MappedTypeNode) {
    return createTsCall(
      'createMappedTypeNode',
      [
        transformVisitor(node.readonlyToken),
        transformVisitor(node.typeParameter),
        transformVisitor(node.questionToken),
        transformVisitor(node.type),
      ]
    ) 
  }

  function createIndexedAccessType(node: ts.IndexedAccessTypeNode) {
    return createTsCall(
      'createIndexedAccessTypeNode',
      [
        transformVisitor(node.objectType),
        transformVisitor(node.indexType),
      ]
    )
  }

  function createTypeOperator(node: ts.TypeOperatorNode) {
    return createTsCall(
      'createTypeOperatorNode',
      [
        transformSyntaxKind(node.operator),
        transformVisitor(node.type),
      ]
    )
  }

  function createThisType(node: ts.ThisTypeNode) {
    return createTsCall('createThisTypeNode')
  }

  function createParenthesizedType(node: ts.ParenthesizedTypeNode) {
    return createTsCall('createParenthesizedType', [transformVisitor(node.type)])    
  }

  function createInferType(node: ts.InferTypeNode) {
    return createTsCall('createInferTypeNode', [transformVisitor(node.typeParameter)])    
  }

  function createConditionalType(node: ts.ConditionalTypeNode) {
    return createTsCall(
      'createConditionalTypeNode',
      [
        transformVisitor(node.checkType),
        transformVisitor(node.extendsType),
        transformVisitor(node.trueType),
        transformVisitor(node.falseType)
      ]
    )
  }

  function createIntersectionType(node: ts.IntersectionTypeNode) {
    return createTsCall('createIntersectionTypeNode', [transformVisitors(node.types)])    
  }

  function createUnionType(node: ts.UnionTypeNode) {
    return createTsCall('createUnionTypeNode', [transformVisitors(node.types)])    
  }

  function createRestType(node: ts.RestTypeNode) {
    return createTsCall('createRestTypeNode', [transformVisitor(node.type)])    
  }

  function createOptionalType(node: ts.OptionalTypeNode) {
    return createTsCall('createOptionalTypeNode', [transformVisitor(node.type)])    
  }

  function createTypleType(node: ts.TupleTypeNode) {
    return createTsCall('createTupleTypeNode', [transformVisitors(node.elementTypes)])
  }

  function createArrayType(node: ts.ArrayTypeNode) {
    return createTsCall('createArrayTypeNode', [transformVisitor(node.elementType)])
  }

  function createTypeLiteral(node: ts.TypeLiteralNode) {
    return createTsCall('createTypeLiteralNode', [transformVisitors(node.members)])
  }

  function createTypeQuery(node: ts.TypeQueryNode) {
    return createTsCall('createTypeQueryNode',[transformVisitor(node.exprName)])
  }

  function createConstructorType(node: ts.ConstructorTypeNode) {
    return createTsCall(
      'createConstructorTypeNode',
      [
        transformVisitors(node.typeParameters),
        transformVisitors(node.parameters),
        transformVisitor(node.type)
      ]
    )
  }

  function createFunctionType(node: ts.FunctionTypeNode) {
    return createTsCall(
      'createFunctionTypeNode',
      [
        transformVisitors(node.typeParameters),
        transformVisitors(node.parameters),
        transformVisitor(node.type)
      ]
    )
  }

  function createTypeReference(node: ts.TypeReferenceNode) {
    return createTsCall(
      'createTypeReferenceNode',
      [
        transformVisitor(node.typeName),
        transformVisitors(node.typeArguments)
      ]
    )
  }

  function createTypePredicate(node: ts.TypePredicateNode) {
    return createTsCall(
      'createTypePredicateNode',
      [
        transformVisitor(node.parameterName),
        transformVisitor(node.type)
      ]
    )
  }

  function createIndexSignature(node: ts.IndexSignatureDeclaration) {
    return createTsCall(
      'createIndexSignature',
      [
        transformVisitors(node.decorators),
        transformVisitors(node.modifiers),
        transformVisitors(node.parameters),
        transformVisitor(node.type)
      ]
    )
  }

  function createConstructSignature(node: ts.ConstructSignatureDeclaration) {
    return createTsCall(
      'createConstructSignature',
      [
        transformVisitors(node.typeParameters),
        transformVisitors(node.parameters),
        transformVisitor(node.type)
      ]
    )
  }

  function createConstructor(node: ts.ConstructorDeclaration) {
    return createTsCall(
      'createConstructor',
      [
        transformVisitors(node.decorators),
        transformVisitors(node.modifiers),
        transformVisitors(node.parameters),
        transformVisitor(node.body)
      ]
    )
  }

  function createMethodDeclaration(node: ts.MethodDeclaration) {
    return createTsCall(
      'createMethod',
      [
        transformVisitors(node.decorators),
        transformVisitors(node.modifiers),
        transformVisitor(node.asteriskToken),
        transformVisitor(node.name),
        transformVisitor(node.questionToken),
        transformVisitors(node.typeParameters),
        transformVisitors(node.parameters),
        transformVisitor(node.type),
        transformVisitor(node.body)
      ]
    )
  }

  function createMethodSignature(node: ts.MethodSignature) {
    return createTsCall(
      'createMethodSignature',
      [
        transformVisitors(node.typeParameters),
        transformVisitors(node.parameters),
        transformVisitor(node.type),
        transformVisitor(node.name),
        transformVisitor(node.questionToken)
      ]
    )
  }

  function createPropertyDeclaration(node: ts.PropertyDeclaration) {
    return createTsCall(
      'createProperty',
      [
        transformVisitors(node.decorators),
        transformVisitors(node.modifiers),
        transformVisitor(node.name),
        transformVisitorQuestionOrExclamation(node),
        transformVisitor(node.type),
        transformVisitor(node.initializer)
      ]
    )
  }

  function createPropertySignature(node: ts.PropertySignature) {
    return createTsCall(
      'createPropertySignature',
      [
        transformVisitors(node.modifiers),
        transformVisitor(node.name),
        transformVisitor(node.questionToken),
        transformVisitor(node.type),
        transformVisitor(node.initializer)
      ]
    )
  }

  function createDecorator(node: ts.Decorator) {
    return createTsCall(
      'createDecorator',
      [transformVisitor(node.expression)]
    )
  }

  function createParameter(node: ts.ParameterDeclaration) {
    return createTsCall(
      'createParameter',
      [
        transformVisitors(node.decorators),
        transformVisitors(node.modifiers),
        transformVisitor(node.name),
        transformVisitor(node.questionToken),
        transformVisitor(node.type),
        transformVisitor(node.initializer)
      ]
    )
  }

  function createToken<T extends ts.SyntaxKind>(node: ts.Token<T>) {
    ts.createToken(node.kind)
    return createTsCall(
      'createToken',
      [transformSyntaxKind(node.kind)]
    )
  }

  function createTypeParameter(node: ts.TypeParameterDeclaration) {
    return createTsCall(
      'createTypeParameterDeclaration',
      [
        transformVisitor(node.name),
        transformVisitor(node.constraint),
        transformVisitor(node.default),
      ]
    )
  }

  function createComputedPropertyName(node: ts.ComputedPropertyName) {
    return createTsCall(
      'createComputedPropertyName',
      [transformVisitor(node.expression)]
    )
  }

  function createNumericLiteral(node: ts.NumericLiteral) {
    return createLiteral(node, 'createNumericLiteral')
  }

  function BigIntLiteral(node: ts.BigIntLiteral) {
    return createLiteral(node, 'createBigIntLiteral')
  }

  function createStringLiteral(node: ts.StringLiteral) {
    return createLiteral(node, 'createStringLiteral')
  }

  function createRegularExpressionLiteral(node: ts.RegularExpressionLiteral) {
    return createLiteral(node, 'createRegularExpressionLiteral')
  }

  function createNoSubstitutionTemplateLiteral(node: ts.NoSubstitutionTemplateLiteral) {
    return createLiteral(node, 'createNoSubstitutionTemplateLiteral')
  }

  function createTemplateHead(node: ts.TemplateHead) {
    return createLiteral(node, 'createTemplateHead')
  }

  function createTemplateMiddle(node: ts.TemplateMiddle) {
    return createLiteral(node, 'createTemplateMiddle')
  }

  function createTemplateTail(node: ts.TemplateTail) {
    return createLiteral(node, 'createTemplateTail')
  }

  function createIdentifier(node: ts.Identifier) {
    return createLiteral(node, 'createIdentifier')
  }

  function createQualifiedName(node: ts.QualifiedName) {
    return createTsCall(
      'createQualifiedName',
      [
        transformVisitor(node.left),
        transformVisitor(node.right)
      ]
    )
  }

  function createExpressionStatement(node: ts.ExpressionStatement) {
    return createTsCall(
      'createExpressionStatement',
      [transformVisitor(node.expression)]
    )
  }
}

console.log(printer.printFile(transformSourceFile(sourceFile)))
