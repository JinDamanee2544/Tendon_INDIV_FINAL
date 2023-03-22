import { ReactNode } from 'react'

interface ITooltip {
    children: ReactNode;
    title: string;
}

const Tooltip = ({ children, title }: ITooltip) => {
    return (
        <main
        >
            <div className='tooltip tooltip-right' data-tip={`${title}`}>
                {children}
            </div>
        </main >
    )
}
export default Tooltip;