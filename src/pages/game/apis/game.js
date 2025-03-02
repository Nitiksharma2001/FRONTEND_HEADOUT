const BANCKEND_URL = import.meta.env.VITE_BACKEND_URL
export async function getScore(username) {
  const response = await fetch(BANCKEND_URL + '/game/score', {
    method: 'get',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'authorization': `Bearer ${username}`
    },
  })
  return await response.json()
}

export async function getGame(username) {
  const response = await fetch(BANCKEND_URL + '/game/', {
    method: 'get',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'authorization': `Bearer ${username}`
    },
  })
  return await response.json()
}

export async function getCountries(username) {
  const response = await fetch(BANCKEND_URL + '/game/countries', {
    method: 'get',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'authorization': `Bearer ${username}`
    },
  })
  return await response.json()
}
