export function groupBy<T, K = keyof T>(array: Array<T>, key: K) {
  return array.reduce<Record<string, Array<T>>>((prev, cur) => {
    if (!prev[cur[key as string]]) prev[cur[key as string]] = [];
    prev[cur[key as string]].push(cur);
    return prev;
  }, {});
}
export function orderBy<T, K = keyof T>(array: Array<T>, key: K) {
  const res = [...array];
  res.sort((a, b) => a[key as string] - b[key as string]);
  return res;
}
