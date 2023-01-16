import Profile from "./Profile";
import Acheivement from "./Acheivement";
import Activity from "./Activity";
import Statistic from "./Statistic";
import { AnimatePresence, motion } from "framer-motion";
import Setting from "./setting";
import { IoCaretForwardOutline, IoAddCircle } from 'react-icons/io5'
import { useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ResumeList from "./resume/ResumeList";
import { modeType } from "customTypes";
import NavigateButton from "./NavigateButton";
import DashBoardContainer from "@components/baseComponents/DashBoardContainer";

import { ContainerProviderTendon } from 'linkWithBackend/services/container'
import AdminButton from "./AdminButton";

const DashBoard = () => {
    const [mode, setMode] = useState<modeType>(modeType.main);
    //const [width, setWidth] = useState(0)

    const navigateMode = () => {
        //const currentWidth = dashboardRef.current.clientWidth
        if (mode === modeType.main) {
            setMode(modeType.resume)
            /*
            if (currentWidth !== 0) {
                setWidth(currentWidth)
            }
            console.log(currentWidth);
            */
        } else {
            setMode(modeType.main)
            /*
            if (currentWidth !== 0) {
                setWidth(currentWidth)
            }
            console.log(currentWidth);
            */
        }
    }

    const adminMode = () => {

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

                {<div className="mt-5">
                    <Profile />
                    <Activity />
                    <Statistic />
                </div>}

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
            {/* <AdminButton
                direction="left"
                Icon={IoAddCircle}
                onClick={() => adminMode()}
            /> */}
        </div>
    )
}
export default DashBoard;