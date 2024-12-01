import { url } from "../../../utils/serverUrl";
import { redirect } from "react-router-dom";

export async function action({ params }) {
    const { id } = params
    try {
       const req = await fetch(url + `/users/${id}`, {
         method: 'DELETE',
         headers: {
           'Content-Type': 'application/json',
         },
       }) 
        const response = await req.json()
        if (response.msg) return redirect("/admin/users/view")
        return {error: response.error}
    } catch (error) {
        return {error: error.message}
    }
    
}