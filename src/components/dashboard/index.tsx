import Profile from "./Profile";
import Acheivement from "./Acheivement";
import Activity from "./Activity";
import Statistic from "./Statistic";
import { AnimatePresence, motion } from "framer-motion";
import Setting from "./setting";
import { IoCaretForwardOutline, IoAddCircle } from 'react-icons/io5'
import { useEffect, useRef, useState } from "react";
import { AiOutlineLogin, AiOutlineLogout, AiOutlineSearch, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import ResumeList from "./resume/ResumeList";
import { modeType } from "customTypes";
import NavigateButton from "./NavigateButton";
import DashBoardContainer from "@components/baseComponents/DashBoardContainer";
import { ContainerProviderTendon } from 'linkWithBackend/services/container'
import AdminButton from "./AdminButton";
import { useRouter } from "next/router";
import ControlBtn from "./setting/SettingBtn";
import { getToken, getUserCurrentData } from "@components/shareData/user_setting";

const DashBoard = () => {
    const [mode, setMode] = useState<modeType>(modeType.main);
    const [ready, setReady] = useState<boolean>(false);

    const router = useRouter()
    var userInformation = getUserCurrentData()

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

    if (ready) {
        //userInformation = getUserCurrentData()
        //console.log("--> ", getToken(), getUserCurrentData())
    }
    if (!ready) {
        return (
            <p> Loading... </p>
        )
    }

    return (
        <div
            className="flex gap-x-20 justify-center"
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
                    <Profile firstName={userInformation.firstName} lastName={userInformation.lastName} />
                    <Activity />
                    <Statistic />
                </div>

                <AnimatePresence>
                    {mode === modeType.main && <Acheivement />}
                </AnimatePresence>
                <AnimatePresence>
                    {mode === modeType.main && <Setting />}
                </AnimatePresence>

                <NavigateButton
                    direction="right"
                    Icon={IoCaretForwardOutline}
                    onClick={() => navigateMode()}
                />
            </DashBoardContainer>
            <ContainerProviderTendon>
                {mode === modeType.resume && <ResumeList />}
            </ContainerProviderTendon>
        </div>
    )
}
export default DashBoard;