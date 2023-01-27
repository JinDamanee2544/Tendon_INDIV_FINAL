import Profile from "./Profile";
import Acheivement from "./Acheivement";
import Activity from "./Activity";
import Statistic from "./Statistic";
import Setting from "./setting";
import { IoCaretForwardOutline, IoAddCircle } from 'react-icons/io5'
import { Suspense, useEffect, useRef, useState } from "react";
import { AiOutlineLogin, AiOutlineLogout, AiOutlineSearch, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { modeType } from "customTypes";
import NavigateButton from "./NavigateButton";
import DashBoardContainer from "@components/baseComponents/DashBoardContainer";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_services";
import TYPES from "linkWithBackend/interfaces/TendonType";

const ResumeList = dynamic(() => import('./resume/ResumeList'), { suspense: true })
// import ResumeList from "./resume/ResumeList";

const DashBoard = () => {
    const [mode, setMode] = useState<modeType>(modeType.main);
    const [ready, setReady] = useState<boolean>(false);

    const router = useRouter()
    var memService = container.get<MemoryService>(TYPES.MemoryService)
    var userInformation = memService.getUserCurrentData()

    const navigateMode = () => {
        //const currentWidth = dashboardRef.current.clientWidth
        if (mode === modeType.main) {
            setMode(modeType.resume)
        } else {
            setMode(modeType.main)
        }
    }

    useEffect(() => {
        setReady(true)
    }, [])

    if (ready && userInformation.firstName === 'undefined' && userInformation.lastName === 'undefined') {            // Must Login
        router.push({
            pathname: '/login'
        })
    }

    if (!ready) {
        return (
            <></>
        )
    }
    // if (ready) {
    //     //userInformation = getUserCurrentData()
    //     //console.log("--> ", getToken(), getUserCurrentData())
    // }

    return (
        <div
            className="relative flex gap-x-20 justify-center"
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
            <div className="flex z-0">
                {mode === modeType.resume && <ResumeList />}
            </div>
        </div>
    )
}
export default DashBoard;