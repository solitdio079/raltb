import { url } from '../../utils/serverUrl'
export async function loader({ request }) {
  const realUrl = new URL(request.url)
  const name = realUrl.searchParams.get('name')

  try {
    const response = await fetch(
      url + `/posts/category/${name}?cursor=&limit=${5}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const categoryPosts = await response.json()
    console.log(categoryPosts)
    return categoryPosts
  } catch (error) {
    return { error: error.message }
  }
}
