import { useContext, useEffect } from "react"
import { LoadingContext } from "../context/loading.context"
import { useParams } from "react-router-dom"


const Profile = () => {

    const { user } = useContext(LoadingContext)

    const { id } = useParams()

  return (
    <div>Profile</div>
  )
}

export default Profile