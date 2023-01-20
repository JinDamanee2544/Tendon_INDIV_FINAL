import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import Setting from '../Dashboard/setting'
import { NextResponse, NextRequest } from 'next/server'
import { useRouter } from 'next/router'
import { User } from 'linkWithBackend/interfaces/TendonType'
import { SignInHandle } from 'pages/adminControl/service_page/SignView'
import { ContainerProviderTendon } from 'linkWithBackend/services/container'
import SignInMiddleHandle from './handleLogIn'

const Login = () => {
    const router = useRouter();
    const [userProps, setUserProps] = useState<User>({} as User)
    const [isCal, setisCal] =useState<boolean>(false)
    const onChangeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ... userProps,
            email: e.currentTarget.value,
        })
        setisCal(false)
    };
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ... userProps,
            password: e.currentTarget.value
        })
        setisCal(false)
    };
    const submitHandle = (): void => {
       setisCal(true)
    }
    // console.log("current email: ", userProps.email)
    // console.log("current password: ", userProps.password)

    return (
        <div
            className="flex gap-x-20 justify-center"
        >
            <motion.main
                className="bg-slate-100 dark:bg-gray-normal p-6 flex gap-4 rounded-3xl min-h-[500px]"
                initial={{ opacity: 1, y: -100, scale: 0 }}
                animate={{
                    opacity: 1, y: 0, scale: 1,
                }}
                exit={{ opacity: 1, y: -100, scale: 0 }}
            >
                <motion.div
                    className='flex flex-col gap-4 p-4 rounded-xl bg-slate-200 dark:bg-gray-light  text-slate-700 dark:text-white'
                    initial={{ opacity: 0, scale: 0, y: -100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                >
                    <h1 className="p-2 text-2xl font-bold ">Login</h1>
                    <input
                        type="text"
                        placeholder='myemail@mail.com'
                        className='input' onChange={ onChangeEmail } />
                    <input
                        type="password"
                        placeholder='Password'
                        className='input' onChange={ onChangePassword } />
                    <motion.button
                        className="bg-gradient-to-r text-white from-purple-light to-purple-neon border-0  font-bold py-2 px-4 rounded-full"
                        whileTap={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={ submitHandle }
                    >
                        Log In
                    </motion.button>

                    {/* < SignInMiddleHandle body={ userProps } isCal = {isCal} /> */}
                    < ContainerProviderTendon >
                        < SignInHandle body={ userProps } isCal = { isCal } />
                    </ContainerProviderTendon>

                    <p className=' text-sm text-center'>
                        Don’t have an account &nbsp;
                        <Link href={'/signup'} >
                            <span
                                className='cursor-pointer text-purple-light hover:text-purple-neon'>
                                Sign Up
                            </span>
                        </Link>
                    </p>
                </motion.div>
                <div >
                    <Setting />
                </div>
            </motion.main>
        </div>
    )
}
export default Login