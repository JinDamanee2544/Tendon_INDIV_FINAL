
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import Tooltip from '@components/baseComponents/tooltip';

interface ControlBtnProps {
    Icon: IconType
    onclick?: () => void;
    title: string;
}

const LoginFirstBtn = ({ Icon, onclick, title }: ControlBtnProps) => {
    return (
        <Tooltip title={title}>
            <motion.button className="bg-slate-400 dark:bg-gray-normal rounded-full p-2"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={onclick}
            >
                <Icon size={90} />
            </motion.button>
        </Tooltip>
    )
}
export default LoginFirstBtn;
