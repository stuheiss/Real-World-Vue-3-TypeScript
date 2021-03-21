import axios, { AxiosInstance } from 'axios'
import { taskEither } from 'fp-ts'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// TaskEither client
// implements get
const apiClientTE = {
  get: (path: string) =>
    taskEither.tryCatch<Error, { name: string }>(
      () => apiClient.get(path),
      reason => new Error(String(reason))
    )()
}

// application example
// apiClientTE.get('/events/123').then(
//   E.fold(
//     l => console.log({ left: l }),
//     r => console.log({ right: r.data })
//   )
// )

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id: String) {
    return apiClient.get('/events/' + id)
  },
  getEventsTE() {
    return apiClientTE.get('/events')
  },
  getEventTE(id: String) {
    return apiClientTE.get('/events/' + id)
  }
}
