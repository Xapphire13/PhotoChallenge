export default function isNotNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}
