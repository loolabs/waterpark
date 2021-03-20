export const indexData = <K, V extends { id: K }>(items: Array<V> = []): Map<K, V> => {
  return new Map<K, V>(items.map((item) => [item.id, item]))
}
