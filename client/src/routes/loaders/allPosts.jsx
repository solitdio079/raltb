import { url } from '../../utils/serverUrl'
export async function loader() {
  try {
    const response = await fetch(url + `/posts/?cursor=&limit=${5}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    const allPosts = await response.json()
    console.log(allPosts)
    return allPosts
  } catch (error) {
    return { error: error.message }
  }
}
