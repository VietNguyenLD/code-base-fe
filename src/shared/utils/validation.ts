export function isEmail(value: string): boolean {
  return /\S+@\S+\.\S+/.test(value);
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function minLength(value: string, length: number): boolean {
  return value.trim().length >= length;
}
