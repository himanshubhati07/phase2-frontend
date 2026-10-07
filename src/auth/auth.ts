// Mock authentication functions
const mockUsers = [
  { id: 'u1', email: 'user@example.com', password: 'password' }
];

export const localLogin = async (email: string, password: string) => {
  const user = mockUsers.find(user => user.email === email && user.password === password);
  if (user) {
    localStorage.setItem('auth_token', JSON.stringify(user));
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token');
};

export const logout = () => {
  localStorage.removeItem('auth_token');
};