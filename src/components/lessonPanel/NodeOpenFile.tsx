type NodeOpenFileProps = {
    name: string
    data: string
    icon: React.ReactNode
}

const NodeOpenFile = ({ name, data, icon }: NodeOpenFileProps) => {
    return (
        <a className='text-lg flex gap-6 items-center p-4 bg-slate-200 dark:bg-gray-light rounded-2xl hover:scale-105 duration-200 active:translate-y-1'
            href={data} target='_blank' rel='noopener noreferrer'
        >
            <div className='bg-white dark:bg-slate-500 p-1.5 rounded-full scale-150'>
                {icon}
            </div>
            <p className='text-lg'>{name}</p>
        </a>
    )
}

export default NodeOpenFile
