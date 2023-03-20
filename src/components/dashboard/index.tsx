import Profile from "./Profile";
import Acheivement from "./Acheivement";
import Activity from "./Activity";
import Statistic from "./Statistic";
import Setting from "./setting";
import { IoCaretForwardOutline } from 'react-icons/io5'
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { modeType } from "types";
import NavigateButton from "./NavigateButton";
import DashBoardContainer from "@components/baseComponents/DashBoardContainer";
import { useRouter } from "next/router";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_service";
import TYPES, { MemType } from "linkWithBackend/interfaces/TendonType";
import ResumeList from "./resume/ResumeList";

const memService = container.get<MemoryService>(TYPES.MemoryService)
let userInformation = { firstName: memService.getLocalStorage(MemType.firstName), lastName: memService.getLocalStorage(MemType.lastName) }

const DashBoard = () => {
    const [mode, setMode] = useState<modeType>(modeType.main);
    const [onClient, setOnClient] = useState<boolean>(false);
    const router = useRouter()

    const navigateMode = () => {
        //const currentWidth = dashboardRef.current.clientWidth
        if (mode === modeType.main) {
            setMode(modeType.resume)
        } else {
            setMode(modeType.main)
        }
    }

    useEffect(() => {
        setOnClient(true)
    }, [])

    if (onClient && userInformation.firstName === 'undefined' && userInformation.lastName === 'undefined') {            // Must Login
        router.push({
            pathname: '/login'
        })
    }

    if (!onClient) {
        return <></>
    }
    return (
        <div
            className="relative flex justify-center gap-x-20"
        >
            <DashBoardContainer
                mode={mode}
            >
                <NavigateButton
                    direction="left"
                    Icon={AiOutlineSearch}
                    onClick={() => navigateMode()}
                />

                <div className="mt-5">
                    <Profile
                        firstName={userInformation.firstName}
                        lastName={userInformation.lastName} />
                    <Activity />
                    <Statistic />
                </div>

                {mode === modeType.main && <Acheivement />}
                {mode === modeType.main && <Setting />}

                <NavigateButton
                    direction="right"
                    Icon={IoCaretForwardOutline}
                    onClick={() => navigateMode()}
                />
            </DashBoardContainer>
            <div className="z-0 flex">
                {mode === modeType.resume && <ResumeList />}
            </div>
        </div>
    )
}
export default DashBoard;