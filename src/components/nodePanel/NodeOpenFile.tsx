type NodeOpenFileProps = {
    name: string
    data: string
    icon: React.ReactNode
}

const NodeOpenFile = ({ name, data, icon }: NodeOpenFileProps) => {
    return (
        <a className='flex items-center gap-6 rounded-2xl bg-slate-200 p-4 text-lg duration-200 hover:scale-105 active:translate-y-1 dark:bg-gray-light'
            href={data} target='_blank' rel='noopener noreferrer'
        >
            <div className='scale-150 rounded-full bg-white p-1.5 dark:bg-slate-500'>
                {icon}
            </div>
            <p className='text-lg'>{name}</p>
        </a>
    )
}

export default NodeOpenFile
