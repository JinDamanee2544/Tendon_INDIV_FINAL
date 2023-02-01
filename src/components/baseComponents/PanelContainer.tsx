import { motion } from 'framer-motion'

type PanelContainerProps = {
    children: React.ReactNode
}
const PanelContainer = ({ children }: PanelContainerProps) => {
    return (
        <motion.main
            className="bg-slate-100 dark:bg-gray-normal p-6 flex gap-4 rounded-3xl min-h-[500px]"
            initial={{ opacity: 1, y: -100, scale: 0 }}
            animate={{
                opacity: 1, y: 0, scale: 1,
            }}
            exit={{ opacity: 1, y: -100, scale: 0 }}
        >
            {children}
        </motion.main>
    )
}
export default PanelContainer