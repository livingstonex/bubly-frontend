export function truncateString(str: string, sliceLen?: number) {
  if (sliceLen) {
    return str.slice(0, sliceLen) + '...';
  }

  if (str.length > 35) {
    return str.slice(0, 20) + '...';
  }
  return str;
}
