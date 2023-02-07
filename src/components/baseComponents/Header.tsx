import { useRouter } from "next/router";
import ThemeToggle from "@baseComponents/ThemeToggle"
import BreadCrumbNav from "@baseComponents/BreadCrumbNav"
import { useEffect } from "react";

const Header = () => {
    const router = useRouter();
    const noNavPath = ['/[username]/dashboard', '/login', '/signup']

    useEffect(() => {
        console.log(router.pathname)
    }, [router])

    return (
        <>
            <nav className="flex flex-row justify-between items-center">
                {
                    !noNavPath.includes(router.pathname) ?
                        <BreadCrumbNav /> :
                        <div className="mt-36" />
                }
                <ThemeToggle />
            </nav>
        </>
    )
}

export default Header