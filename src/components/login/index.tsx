import Link from 'next/link'
import ViewModel from './ViewModel'
import PanelContainer from '@components/baseComponents/PanelContainer'
import { motion } from 'framer-motion'

const Login = () => {
    const { onChange, submitHandle, userProps } = ViewModel()

    return (
        <div className="flex gap-x-20 justify-center" >
            <PanelContainer>
                <motion.form
                    className='flex flex-col gap-4 p-4 rounded-xl bg-slate-200 dark:bg-gray-light  text-slate-700 dark:text-white'
                    initial={{ opacity: 0, scale: 0, y: -100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    onSubmit={submitHandle}
                >
                    <h1 className="p-2 text-2xl font-bold ">Login</h1>
                    <input
                        name='email'
                        type="text"
                        placeholder='myemail@mail.com'
                        className='input' onChange={onChange} />
                    <input
                        name='password'
                        type="password"
                        placeholder='Password'
                        className='input' onChange={onChange} />
                    <button
                        type='submit'
                        className="bg-gradient-to-r text-white from-purple-light to-purple-neon border-0  font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed active:scale-105 duration-100"
                        disabled={userProps.email == '' || userProps.password == ''}
                    >
                        Log In
                    </button>

                    <p className=' text-sm text-center'>
                        Don’t have an account &nbsp;
                        <Link href={'/signup'} >
                            <span className='cursor-pointer text-purple-light hover:text-purple-neon'>Sign Up</span>
                        </Link>
                    </p>
                </motion.form>
            </PanelContainer>
        </div>
    )
}
export default Login