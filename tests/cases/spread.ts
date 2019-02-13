const spread = { a: 1, b: 2 }

const s1 = { ...spread }

const s2 = { c: 1, ...spread }

const s3 = {
  ...spread,
  c: 1
}

const spreadArray = [1, 2, 3]

const sa1 = [...spreadArray]

const [] = spreadArray

const [a1] = spreadArray

const [a2, a3] = spreadArray

function block1() {
  const { a, b } = spread
  const { a: aa, b: bb } = spread
  const { ...others } = spread
  const [a4, ...other] = spreadArray
}
