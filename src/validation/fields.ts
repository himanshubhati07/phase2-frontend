export function validateEmail(value: string): string {
  return /^\S+@\S+\.\S+$/.test(value) ? '' : 'Enter a valid email address.'
}

export function validatePassword(value: string): string {
  return value.length >= 6 ? '' : 'Use at least 6 characters.'
}
