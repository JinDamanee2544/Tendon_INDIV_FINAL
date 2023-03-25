import Router from "next/router"
import { useEffect } from "react"

const RootPage = () => {
    useEffect(() => {
        Router.push("/login")
    }, [])
    return <></>
}
export default RootPage