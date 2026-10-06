export function validateEmail(email: string): string {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a valid email address.";
}

export function validatePassword(password: string): string {
  return password.length >= 6 ? "" : "Use at least 6 characters.";
}

export function validateRequired(value: string, label: string): string {
  return value.trim() ? "" : `${label} is required.`;
}
