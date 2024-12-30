// eslint-disable-next-line @typescript-eslint/no-explicit-any
function excludeAttributes<T extends Record<string, any>, Key extends keyof T>(
  data: T,
  keys: Key[],
) {
  const newObject = Object.entries(data).filter(
    ([key]) => !keys.includes(key as Key),
  );
  return Object.fromEntries(newObject) as Omit<T, Key>;
}

export { excludeAttributes };
