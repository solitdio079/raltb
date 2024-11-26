import { url } from '../../utils/serverUrl'
export async function loader() {
  try {
    const req = await fetch(url + '/categories/', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const response = await req.json()
    return response
  } catch (error) {
    return { error: error.message }
  }
}
