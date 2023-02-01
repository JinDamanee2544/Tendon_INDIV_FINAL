import { Node } from 'linkWithBackend/interfaces/TendonType';
import { AiFillFile, AiFillFilePdf, AiFillSound } from 'react-icons/ai';
import { FaVideo, FaImage } from 'react-icons/fa'
import { ImParagraphJustify } from 'react-icons/im'

const getIcon = (type: string) => {
    switch (type) {
        case 'pdfNode':
            return <AiFillFilePdf />
        case 'videoNode':
            return <FaVideo />
        case 'textNode':
            return <ImParagraphJustify />
        case 'soundNode':
            return <AiFillSound />
        case 'imageNode':
            return <FaImage />

        // For testing
        case 'PDF':
            return <AiFillFilePdf />

        default:
            // console.log('No icon found for type: ' + type)
            return <AiFillFile />
        // throw new Error('No match type')
    }
}

export const NodeWithModal = ({ type, data }: Omit<Node, 'id'>) => {
    const Icon = getIcon(type)
    return (
        <>
            <label
                className='flex gap-6 items-center p-4 bg-slate-200 dark:bg-gray-light rounded-2xl hover:scale-105 duration-200 active:translate-y-1'
                htmlFor="my-modal-4">
                <div className='bg-white dark:bg-slate-500 p-1.5 rounded-full scale-150'>
                    {Icon}
                </div>
                <p className='text-lg'>{data}</p>
            </label>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">
                        File Name
                    </h3>
                    <p className="py-4">
                        {`
                        default text file (in this case, it's not a pdf file)
                        `}
                    </p>
                </label>
            </label>
        </>
    )
}

const mockPdfLink = 'https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2022_2/32221/materials/Chapter00_Intro_to_Course-336264-16728214700176.pdf'

export const NodeOpenFile = ({ type, data }: Omit<Node, 'id'>) => {
    const Icon = getIcon(type)
    return (
        <a className='text-lg flex gap-6 items-center p-4 bg-slate-200 dark:bg-gray-light rounded-2xl hover:scale-105 duration-200 active:translate-y-1'
            href={mockPdfLink} target='_blank' rel='noopener noreferrer'
        >
            <div className='bg-white dark:bg-slate-500 p-1.5 rounded-full scale-150'>
                {Icon}
            </div>
            <p className='text-lg'>{data}</p>
        </a>
    )
}
