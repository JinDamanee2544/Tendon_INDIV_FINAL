interface INodeBaseView {
    icon: React.ReactNode,
    name: string,
    progress?: number,
}

const NodeBaseView = (props: INodeBaseView) => {
    const { icon, name, progress } = props
    return (
        <>
            <div className='scale-150 rounded-full bg-white p-1.5 dark:bg-slate-500'>
                {icon}
            </div>
            <div className="flex grow items-center justify-between">
                <p className='text-lg'>{name}</p>
                <p className="text-sm">{progress}%</p>
            </div>
        </>
    )
}

export default NodeBaseView