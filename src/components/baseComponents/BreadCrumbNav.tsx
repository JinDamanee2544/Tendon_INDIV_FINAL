import BreadCrumbContainer from '@baseComponents/BreadCrumbContainer';
import { useBreadCrumb } from 'context/breadCrumbContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BreadCrumbNav = () => {

    const { pathList } = useBreadCrumb()

    useEffect(() => {
        // console.log(pathList)
    }, [pathList])

    return (
        <BreadCrumbContainer>
            <div className='flex items-center justify-center overflow-hidden rounded-full'>
                <Image src={'/raiden.jpg'} alt='user' height={50} width={50} />
            </div>
            <div className="breadcrumbs overflow-hidden p-2 font-bold">
                <ul>
                    {
                        pathList.map((path, index) => {
                            return (
                                <li key={index}>
                                    {index == pathList.length - 1 ?
                                        <NavItem
                                            name={path.name}
                                            link={path.link}
                                            isActive={false}
                                        /> :
                                        <NavItem
                                            name={path.name}
                                            link={path.link}
                                            isActive={true}
                                        />
                                    }
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </BreadCrumbContainer>
    );
}

type NavItemProps = {
    name: string
    link: string
    isActive: boolean
}


const NavItem = ({ name, link, isActive }: NavItemProps) => {
    return (
        <>
            {
                isActive ? (
                    <Link href={link}>{name}</Link>
                ) :
                    <span className='mr-2 rounded-xl bg-white p-2 text-purple-light'>{name}</span>
            }
        </>
    )
}
export default BreadCrumbNav;