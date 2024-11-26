import { url } from "../../utils/serverUrl"

export async function loader() {
    try {
        const req = await fetch(url + '/users/', {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await req.json()
        if (response.error) throw new Error(response.error)
        return response
    } catch (error) {
        return {error: error.message}
    }
}