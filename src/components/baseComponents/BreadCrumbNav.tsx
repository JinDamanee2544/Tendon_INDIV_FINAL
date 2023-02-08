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
            <div className='rounded-full overflow-hidden flex justify-center items-center'>
                <Image src={'/raiden.jpg'} alt='user' height={50} width={50} />
            </div>
            <div className="font-bold breadcrumbs p-2 overflow-hidden">
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
                    <span className='bg-white text-purple-light p-2 rounded-xl mr-2'>{name}</span>
            }
        </>
    )
}
export default BreadCrumbNav;