import Link from 'next/link'
import Setting from '../dashboard/setting'
import { SignInHandle } from 'unused-pages/service_page/SignView'
import ViewModel from './ViewModel'
import PanelContainer from '@components/baseComponents/PanelContainer'
import FormContainer from '@components/baseComponents/FormContainer'

const Login = () => {
    const { isCal, onChange, signupMessage, submitHandle, userProps } = ViewModel()

    return (
        <>
            {/* <div className="flex gap-x-20 justify-center" style={{ margin: '10px', color: "#c5aac8" }}>
                <p> {signupMessage['message']} </p>
            </div> */}
            <div className="flex gap-x-20 justify-center" >
                <PanelContainer>
                    <FormContainer>
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
                            onClick={submitHandle}
                            disabled={userProps.email == '' || userProps.password == ''}
                        >
                            Log In
                        </button>

                        {/* < SignInMiddleHandle body={ userProps } isCal = {isCal} /> */}
                        < SignInHandle body={userProps} isCal={isCal} />

                        <p className=' text-sm text-center'>
                            Don’t have an account &nbsp;
                            <Link href={'/signup'} >
                                <span
                                    className='cursor-pointer text-purple-light hover:text-purple-neon'>
                                    Sign Up
                                </span>
                            </Link>
                        </p>
                    </FormContainer>
                </PanelContainer>
            </div>
        </>
    )
}
export default Login