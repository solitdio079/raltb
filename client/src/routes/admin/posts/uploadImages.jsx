import { url } from '../../../utils/serverUrl'

export async function action({ request }) {
  const formData = await request.formData()
  try {
    const req = await fetch(url + '/posts/postImages', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData,
    })
    const response = await req.json()
    return response
  } catch (error) {
    return { error: error.message }
  }
}
