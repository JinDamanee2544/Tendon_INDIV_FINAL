import { useRouter } from "next/router";
import ThemeToggle from "@baseComponents/ThemeToggle"
import BreadCrumbNav from "@baseComponents/BreadCrumbNav"

const Header = () => {
    const router = useRouter();
    const noNavPath = ['/', '/login', '/signup']
    return (
        <>
            <nav className="flex flex-row justify-between items-center">
                {!noNavPath.includes(router.pathname) &&
                    <BreadCrumbNav />
                }
                <ThemeToggle />
            </nav>
        </>
    )
}

export default Header