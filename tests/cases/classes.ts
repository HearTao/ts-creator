class AA {}

class BB extends AA {
  protected cc: number = 0
}

interface I {}

class CC extends BB implements I {
  private ccc: number = 1

  public ['dd']: number = 2

  get t() {
    return this.ccc + this.cc
  }

  set t(v) {
    this.ccc = v
  }

  foo() {}

  constructor(public a: number, b: number) {
    super()
  }
}

const ce = class A {}

abstract class AC {
  abstract foo(): number
}
