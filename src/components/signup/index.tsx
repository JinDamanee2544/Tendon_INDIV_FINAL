import { motion } from 'framer-motion'
import { useState } from 'react';
import Setting from '../Dashboard/setting';
import { User } from 'linkWithBackend/interfaces/TendonType';
import { ContainerProviderTendon } from 'linkWithBackend/services/container';
import { SignUpHandle } from 'pages/adminControl/service_page/SignView';
const SignupBox = () => {
    const [userProps, setUserProps] = useState<User>({} as User)
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isCal, setIsCal] =useState<boolean>(false)
    const onChangeFName = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ... userProps,
            firstName: e.currentTarget.value
        })
    };
    const onChangeLName = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ... userProps,
            lastName: e.currentTarget.value
        })
    };
    const onChangeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ... userProps,
            email: e.currentTarget.value
        })
    };
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ... userProps,
            password: e.currentTarget.value
        })
    };
    const onChangeConfirmPassword = (e: React.FormEvent<HTMLInputElement>): void => {
        setConfirmPassword(e.currentTarget.value)
    };

    const submitHandle = (): void => {
        if (userProps.email === undefined) {
            setIsCal(false)
            alert("Email cannot be blank")
        }
        else if (userProps.firstName === undefined) {
            setIsCal(false)
            alert("Firstname cannot be blank")
        }
        else if (userProps.lastName === undefined) {
            setIsCal(false)
            alert("Lastname cannot be blank")
        }
        else if (userProps.password === undefined || userProps.password === "") {
            setIsCal(false)
            alert("Password cannot be blank")
        }
        else if (userProps.password !== confirmPassword) {
            setIsCal(false)
            alert("Password and Confirm Password must be the same.!!!")
        } else {
            console.log("right")
            setIsCal(true)
        } 
    }

    return (
        <div className="flex gap-x-20 justify-center">
            <motion.main
                className="bg-slate-100 dark:bg-gray-normal text-white p-6 flex gap-4 rounded-3xl min-h-[500px]"
                initial={{ opacity: 1, y: -100, scale: 0 }}
                animate={{
                    opacity: 1, y: 0, scale: 1,
                }}
                exit={{ opacity: 1, y: -100, scale: 0 }}
            >
                <motion.div
                    className='flex flex-col gap-4 p-4 bg-slate-200 dark:bg-gray-light  text-slate-700 dark:text-white rounded-xl'
                    initial={{ opacity: 0, scale: 0, y: -100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                >
                    <h1 className="p-2 text-2xl font-bold">Sign Up</h1>
                    <input
                        type="text"
                        placeholder='myemail@mail.com'
                        className='input' 
                        onChange={ onChangeEmail } 
                        required/>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder='First Name'
                            className='input '
                            onChange={ onChangeFName } />
                        <input
                            type="text"
                            placeholder='Last Name'
                            className='input'
                            onChange={ onChangeLName } />
                    </div>
                    <input
                        type="password"
                        placeholder='Password'
                        className='input' 
                        onChange={ onChangePassword }/>
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        className='input' 
                        onChange={ onChangeConfirmPassword }/>
                    <motion.button
                        className="bg-gradient-to-r from-purple-light to-purple-neon border-0 text-white font-bold py-2 px-4 rounded-full"
                        whileTap={{ scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick = { submitHandle }
                    >
                        Sign Up
                    </motion.button>
                </motion.div>
                <div >
                    <Setting />
                </div>
            </motion.main>

            < ContainerProviderTendon >
                < SignUpHandle body={ userProps } isCal = {isCal} />
            </ContainerProviderTendon>
        </div>
    )
}


export default SignupBox;