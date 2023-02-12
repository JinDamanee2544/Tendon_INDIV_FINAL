import { motion } from 'framer-motion'

type PanelContainerProps = {
    children: React.ReactNode
}
const PanelContainer = ({ children }: PanelContainerProps) => {
    return (
        <motion.main
            className="flex min-h-[500px] gap-4 rounded-3xl bg-slate-100 p-6 dark:bg-gray-normal"
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