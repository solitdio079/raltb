import { url } from "../../../utils/serverUrl"

export async function action({ request }) {
    const formData = await request.formData()
    const formObj = Object.fromEntries(formData)

    try {
        const req = await fetch(url + `/users/role/${formObj.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObj)
        })
        const response = await req.json()
        return response
    } catch (error) {
        return {error: error.message}
    }
}