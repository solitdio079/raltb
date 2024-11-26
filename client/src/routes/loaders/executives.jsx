import { url } from '../../utils/serverUrl'
export async function loader() {
  try {
    const response = await fetch(url + `/users/executive`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      const allExecs = await response.json()
      console.log(allExecs)
    return allExecs
  } catch (error) {
    return { error: error.message }
  }
}
