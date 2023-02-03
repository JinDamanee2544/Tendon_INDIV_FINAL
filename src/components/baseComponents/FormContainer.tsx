import { motion } from 'framer-motion'

type FormContainerProps = {
    children: React.ReactNode
}

const FormContainer = ({ children }: FormContainerProps) => {
    return (
        <motion.div
            className='flex flex-col gap-4 p-4 rounded-xl bg-slate-200 dark:bg-gray-light  text-slate-700 dark:text-white'
            initial={{ opacity: 0, scale: 0, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
        >
            {children}
        </motion.div>
    )
}
export default FormContainer