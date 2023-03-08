function free(username: string) {
  const encodedUsername = encodeURIComponent(username);
  return fetch(`/api/auth/users/check?username=${encodedUsername}`).then(
    (r) => r.status == 404
  );
}

function register(username: string, password: string) {
  return fetch('/api/register', {
    method: 'post',
    body: JSON.stringify({ username, password })
  });
}
export { free, register };
