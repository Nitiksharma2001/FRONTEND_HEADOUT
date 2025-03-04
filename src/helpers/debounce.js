export const searchDebounceHandler = (cb, time = 500) => {
  let id
  return (text) => {
    clearTimeout(id)
    id = setTimeout(() => {
      cb(text)
    }, time)
  }
}
