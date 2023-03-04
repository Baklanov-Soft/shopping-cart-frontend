import { encodeURL } from 'js-base64';

export function checkUsername(username: string) {
  const encodedUsername = encodeURL(username);
  return fetch(`/api/auth/users/check?username=${encodedUsername}`).then(
    (r) => r.status == 200
  );
}
