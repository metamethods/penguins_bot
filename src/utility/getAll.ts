export function getAll<T>(t: T, handler: (t: T) => T, ): T[] {
  return [t, handler(t)];
}