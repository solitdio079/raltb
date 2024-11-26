import { url } from '../../utils/serverUrl'
export async function loader() {
  try {
    const response = await fetch(url + `/users/member`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      const allMembers = await response.json()
      console.log(allMembers);
    return allMembers
  } catch (error) {
    return { error: error.message }
  }
}
