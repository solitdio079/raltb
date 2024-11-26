import { url } from "../../../utils/serverUrl"
import InfiniteEntity from "../../../components/infiniteEntity"
import UserCardAdmin from "../../../components/admin/userCardAdmin"
//import AnimatedLayout from "../../../../animation/AnimatedLayout"
export default function ViewAllUsers() {
    return (
     
        <InfiniteEntity
          loaderRoute={'/loaders/allUsers'}
          fetchMoreURL={url + '/users/'}
          UnitEntity={UserCardAdmin}
        />
     
    )
}