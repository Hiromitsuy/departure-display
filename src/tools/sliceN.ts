

export function sliceByN<T>(array: Array<T>, n: number): Array<Array<T>> {
  const retArray: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i += n)
    retArray.push(array.slice(i, i + n))
  return retArray;
}