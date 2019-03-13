declare const Comp: any
declare const Comp1: any

declare const props: any

const t1 = <Comp a={123} b="b" c />

const t2 = <Comp />

const t3 = <Comp {...props} />

const t4 = <Comp>text</Comp>

const t5 = (
  <Comp>
    <Comp1 />
  </Comp>
)

const t6 = (
  <>
    <Comp />
  </>
)
