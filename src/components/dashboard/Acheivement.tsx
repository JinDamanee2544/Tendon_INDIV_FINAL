import { motion } from 'framer-motion'
import { AcheivementData as data } from '../../mockData/index'
import Scrollbars from 'react-custom-scrollbars-2'
const Acheivement = () => {

    // const item = {
    //     hidden: {
    //         opacity: 0,
    //         scale: 0,
    //         transition: { duration: 0.1 }
    //     },
    // }

    return (
        <motion.main className='flex w-[300px] flex-col gap-2 rounded-lg bg-slate-200 p-4 text-slate-700 dark:bg-gray-light dark:text-white'
            key={'acheivement'}
            initial={{ opacity: 0, y: -100, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}

        // exit={'hidden'}
        // variants={item}
        >
            <h1 className='self-end text-3xl font-bold'>Achievement</h1>
            <h1 className='  -mt-1 self-end text-2xl'>19 items</h1>
            <Scrollbars
                universal
            >
                <div className='flex flex-col gap-2 overflow-x-hidden overflow-y-clip p-2'>
                    {data.map(item => {
                        return <AcheivementList
                            key={item.id}
                            {...item}
                            isCompleted={true}
                        />
                    })}
                </div>
            </Scrollbars>

            <h1 className='text-xl font-bold '>Keep it up!</h1>
            <Scrollbars
                universal
            >
                <div className='flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-2 '>
                    {data.map(item => {
                        return <AcheivementList
                            key={item.id}
                            {...item}
                            isCompleted={false}
                        />
                    })}
                </div>
            </Scrollbars>
        </motion.main >
    )
}
interface AcheivementListProps {
    id: number,
    title: string,
    thumbnail: string,
    isCompleted: boolean,
}
const AcheivementList = ({ id, title, thumbnail, isCompleted }: AcheivementListProps) => {
    return (
        <motion.main
            className={`flex items-center gap-4 rounded-xl p-2 text-white shadow
        ${isCompleted ? 'bg-gradient-to-bl from-purple-neon to-purple-light' : 'bg-slate-500 dark:bg-gray-normal'}`}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}

        >
            <div className='h-5 w-5 rounded-full bg-white' />
            <p>{title}</p>
        </motion.main >
    )
}
export default Acheivement;