import { motion } from 'framer-motion'
import { NavigateProps } from '../../types';
const NavigateButton = ({ Icon, direction, onClick }: NavigateProps) => {
    return (
        <main className="h-0 w-0">
            <motion.button
                className={
                    `relative top-[205px] z-10 flex h-fit w-fit items-center justify-center rounded-full bg-slate-400 p-2 text-white shadow-xl dark:bg-gray-light
            ${direction === 'right' ? '-right-0' : '-left-12'}`
                }
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                initial={{ x: direction === 'right' ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                onClick={onClick}
            >
                <Icon size={30} />
            </motion.button>
        </main>
    )
}
export default NavigateButton;