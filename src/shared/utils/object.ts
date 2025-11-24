export function isEmptyObject(obj: unknown): boolean {
  return !!obj && typeof obj === "object" && Object.keys(obj as object).length === 0;
}

export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
