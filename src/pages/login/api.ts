import { encodeURL } from 'js-base64';

function exists(username: string) {
  const encodedUsername = encodeURL(username);
  return fetch(`/api/auth/users/check?username=${encodedUsername}`).then(
    (r) => r.status == 200
  );
}
function login(username: string, password: string) {
  return fetch('/api/login', {
    method: 'post',
    body: JSON.stringify({ username, password })
  });
}

export { exists, login };
