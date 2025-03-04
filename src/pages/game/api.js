const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export async function getGame(username) {
  const response = await fetch(BACKEND_URL + '/game/', {
    method: 'get',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `Bearer ${username}`,
    },
  })
  return await response.json()
}
export async function getScore(username) {
  const response = await fetch(BACKEND_URL + '/game/score', {
    method: 'get',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `Bearer ${username}`,
    },
  })
  return await response.json()
}

export async function getCountries(username) {
  const response = await fetch(BACKEND_URL + '/game/countries', {
    method: 'get',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `Bearer ${username}`,
    },
  })
  return await response.json()
}

export async function validateAnswer(alias, answer, username) {
  const response = await fetch(BACKEND_URL + '/game', {
    method: 'post',
    body: JSON.stringify({ alias, answer }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `Bearer ${username}`,
    },
  })
  const { result, funFacts } = await response.json()
  return { result, funFacts }
}
