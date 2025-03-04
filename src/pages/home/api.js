export async function createUser(username, friendsUsernames) {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/', {
    method: 'post',
    body: JSON.stringify({ username, friendsUsernames }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  const { message, user } = await response.json()
  return { message, user }
}
export async function getUser(username) {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/' + username, {
    method: 'get',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  const { user, message } = await response.json()
  return { user, message }
}

export async function isValidUsername(text) {
  if (!text) return false
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/exists/' + text)
  const { exists } = await response.json()
  return exists
}
