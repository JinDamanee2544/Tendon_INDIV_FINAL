import React from "react";
import { AiOutlineLogout, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { useRouter } from "next/router";
import ControlBtn from "./SettingBtn";

const Setting = () => {
    const router = useRouter();
    return (
        <motion.main
            className="  flex h-full  flex-col gap-4 rounded-3xl  bg-slate-200 p-2 pt-6 text-white dark:bg-gray-medium"
            key='setting'
            initial={{ opacity: 0, scale: 0, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
        // exit={'hidden'}
        // variants={item}
        >
            <ControlBtn Icon={AiOutlineUser} title='Profile' />
            <ControlBtn Icon={AiOutlineSetting} title='Setting' />
            <ControlBtn
                Icon={AiOutlineLogout}
                title='Logout'
                onclick={() => router.push('/login')}
            />
        </motion.main>

    )
}
export default Setting;