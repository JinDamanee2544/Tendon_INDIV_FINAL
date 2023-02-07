import { resumeProps } from '@customTypes/index';
import { motion } from 'framer-motion'
import TYPES from 'linkWithBackend/interfaces/TendonType';
import container from 'linkWithBackend/services/inversify.config';
import MemoryService from 'linkWithBackend/services/memory_services';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useXarrow } from 'react-xarrows';

const memService = container.get<MemoryService>(TYPES.MemoryService)

const ResumeItem = ({ id, courseData, setIsReady }: resumeProps) => {
    const updateArrow = useXarrow();
    const router = useRouter();
    const username = useMemo(() => memService.getLocalStorage('firstName') + memService.getLocalStorage('lastName'), [])

    useEffect(() => {
        setTimeout(() => setIsReady(true), 200)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <motion.button className="p-2 rounded-lg bg-slate-500 dark:bg-gray-normal text-white dark:border-2 dark:border-purple-light dark:shadow-purple-neon shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            id={id}
            onUpdate={() => {
                setInterval(updateArrow, 100)
            }}
            onClick={() => router.push(`/${username}/courseMap/${id}${"-"}${courseData.name}`)}
        >
            {courseData.name}
        </motion.button>
    )
}
export default ResumeItem;