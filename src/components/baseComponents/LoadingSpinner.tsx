import { motion } from 'framer-motion'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const LoadingSpinner = () => {
    return (
        <motion.main
            className='absolute top-1/2 left-1/2'
        >
            <AiOutlineLoading3Quarters className='animate-spin fill-slate-200 text-6xl' />
        </motion.main>
    )
}

export default LoadingSpinner