type ModalProps = {
    children: React.ReactNode
    id: string
}
const Modal = ({ children, id }: ModalProps) => {
    return (
        <>
            <input type="checkbox" id={`modal-${id}`} className="modal-toggle" />
            <label htmlFor={`modal-${id}`} className="modal cursor-pointer">
                <label className="modal-box min-w-max flex flex-col gap-4" htmlFor="">
                    {children}
                </label>
            </label>
        </>
    )
}

export default Modal