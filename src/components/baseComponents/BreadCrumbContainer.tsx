import { motion } from 'framer-motion'

type props = {
    children: React.ReactNode
}

const BreadCrumbContainer = ({ children }: props) => {
    return (
        <motion.main
            key='breadcrumb'
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            drag
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="m-10 flex items-center justify-center gap-4 rounded-full bg-gradient-to-r from-purple-light to-purple-neon p-2 text-xl font-bold text-white "
        >
            {children}
        </motion.main>
    )
}

export default BreadCrumbContainer