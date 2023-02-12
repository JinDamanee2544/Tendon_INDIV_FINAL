import React from "react";
import { statData } from "../../mockData";
import { AiFillBook } from 'react-icons/ai'
import { motion } from 'framer-motion'
const Statistic = () => {
    return (
        <main className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-slate-700 dark:text-white">Summary</h1>
            {statData.map((item, idx) => {
                return <StatList key={idx} {...item} />
            })}
        </main>
    )
}
const StatList: React.FC<{ name: string }> = ({ name }) => {
    return (
        <motion.main className="flex items-center rounded bg-gradient-to-bl from-purple-neon to-purple-light p-2 text-white shadow"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}

        >
            <AiFillBook size={30} />
            {name}
        </motion.main>
    )
}
export default Statistic;