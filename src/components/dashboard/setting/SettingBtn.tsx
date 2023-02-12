
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import Tooltip from '@components/baseComponents/Tooltip';

interface ControlBtnProps {
    Icon: IconType
    onclick?: () => void;
    title: string;
}

const ControlBtn = ({ Icon, onclick, title }: ControlBtnProps) => {
    return (
        <Tooltip title={title}>
            <motion.button className="rounded-full bg-slate-400 p-2 dark:bg-gray-normal"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={onclick}
            >
                <Icon size={20} />
            </motion.button>
        </Tooltip>
    )
}
export default ControlBtn;
