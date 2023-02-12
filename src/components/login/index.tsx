import Link from 'next/link'
import ViewModel from './ViewModel'
import PanelContainer from '@components/baseComponents/PanelContainer'
import { motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { onChange, submitHandle, userProps } = ViewModel()

    return (
        <div className="flex justify-center gap-x-20" >
            <PanelContainer>
                <motion.form
                    className='flex flex-col gap-4 rounded-xl bg-slate-200 p-4 text-slate-700  dark:bg-gray-light dark:text-white'
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
                        className="rounded-full border-0 bg-gradient-to-r from-purple-light to-purple-neon  py-2 px-4 font-bold text-white duration-100 active:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={userProps.email == '' || userProps.password == ''}
                    >
                        Log In
                    </button>

                    <p className=' text-center text-sm'>
                        Don’t have an account &nbsp;
                        <Link href={'/signup'} >
                            <span className='cursor-pointer text-purple-light hover:text-purple-neon'>Sign Up</span>
                        </Link>
                    </p>
                </motion.form>
            </PanelContainer>

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
export default Login