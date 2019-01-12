export function getEnumMembers<T extends Object>(enumObject: T) {
  const result: [number, string][] = []
  for (const name in enumObject) {
    const value = enumObject[name]
    if (typeof value === 'number') {
      result.push([value, name])
    }
  }

  return result.sort((a, b) => a[0] - b[0])
}

export function formatFlags<T extends Object>(
  value: number = 0,
  enumObject: T
): string[] {
  const members = getEnumMembers(enumObject)
  if (value === 0) {
    return members.length > 0 && members[0][0] === 0
      ? [members[0][1]]
      : ([] as string[])
  }

  const result: string[] = []
  let remainingFlags = value
  for (let i = members.length - 1; i >= 0 && remainingFlags !== 0; i--) {
    const [enumValue, enumName] = members[i]
    if (enumValue !== 0 && (remainingFlags & enumValue) === enumValue) {
      remainingFlags &= ~enumValue
      result.push(enumName)
    }
  }
  return result
}
