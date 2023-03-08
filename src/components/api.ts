function logout() {
  return fetch('/api/logout', { method: 'post' });
}

export { logout };
