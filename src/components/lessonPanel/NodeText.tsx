import Modal from "@components/baseComponents/Modal"
import Image from "next/image"
import ModalOpener from "./ModalOpener"

const mockText = `default text file (in this case, it's not a pdf file)`
const mockFilename = 'Activity 1 # Quantum Entanglement'
const mockLink = '/raiden.jpg'

type NodeTextProps = {
    name: string
    data: string
    icon: React.ReactNode
}


const NodeText = ({ name, data, icon }: NodeTextProps) => {
    return (
        <>
            <ModalOpener
                icon={icon}
                name={name}
                id={name}
            />
            <Modal id={name}>
                <h1 className="text-2xl p-2 font-bold text-center">{name}</h1>
                <div>
                    <Image
                        src={mockLink}
                        alt={name}
                        height={300}
                        width={300}
                    />
                </div>
                <p>{data}</p>
            </Modal>
        </>
    )
}

export default NodeText