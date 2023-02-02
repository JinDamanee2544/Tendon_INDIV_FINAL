type ModalOpenerProps = {
    name: string
    icon: React.ReactNode
    id: string
}

const ModalOpener = ({ icon, name, id }: ModalOpenerProps) => {
    return (
        <label
            className='flex gap-6 items-center p-4 bg-slate-200 dark:bg-gray-light rounded-2xl hover:scale-105 duration-200 active:translate-y-1'
            htmlFor={`modal-${id}`}>
            <div className='bg-white dark:bg-slate-500 p-1.5 rounded-full scale-150'>
                {icon}
            </div>
            <p className='text-lg'>{name}</p>
        </label>
    )
}
export default ModalOpener