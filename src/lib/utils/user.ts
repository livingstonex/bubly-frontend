export function getInitials(
  firstName: string | null | undefined,
  lastName: string | null | undefined
) {
  return [firstName, lastName]
    .filter(name => name != null)
    .map(name => name.charAt(0).toUpperCase())
    .join('');
}

export function getFullName(
  firstName: string | null | undefined,
  lastName: string | null | undefined
) {
  return [firstName, lastName].filter(name => name != null).join(' ');
}
