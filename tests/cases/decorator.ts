function args1(...args: any[]) {}
function args2(...args: any[]): any {}

@args1
class D1 {}

@args1
@args2
class D2 {}

@args2(1)
class D3 {}
