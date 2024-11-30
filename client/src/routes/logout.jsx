import { redirect } from 'react-router-dom'
import { url } from '../utils/serverUrl'
export async function action() {
  try {
    const response = await fetch( url + '/auth/logout', {
      method: 'POST',
      credentials: 'include',
      body: {},
    })
    await response.json()
    return redirect('/')
  } catch (error) {
    return { error: error.message }
  }
}
