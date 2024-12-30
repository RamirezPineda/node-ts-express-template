// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeValuesUndefined = <T extends Record<string, any>>(
  data: T,
) => {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  );
};
