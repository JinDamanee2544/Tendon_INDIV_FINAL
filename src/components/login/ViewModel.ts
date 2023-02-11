import TYPES, { localStorageInterface, User } from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_service";
import AuthService from "linkWithBackend/services/sign_service";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from 'react-toastify';

const authService = container.get<AuthService>(TYPES.AuthService)
const memService = container.get<MemoryService>(TYPES.MemoryService)

export default function ViewModel(){
    const router = useRouter();
    const {theme} = useTheme() 
    const [userProps, setUserProps] = useState<User>({} as User)

    const onChange = (e: any) => {
        setUserProps({
            ...userProps,
            [e.target.name]: e.target.value
        })
    }

    const submitHandle = (e:FormEvent) => {
        console.log('submit')
        e.preventDefault()
        login()
    }

    const login = async() => {
        const user = await authService.signIn(userProps)
        const message = authService.getMessage()
        const status = authService.getStatus()
        
        let memStore = {} as localStorageInterface
        memStore.token = user.accessToken
        memStore.firstName = user.firstName
        memStore.lastName = user.lastName
        memService.setLocalStorage(memStore)

        if (status === 200) {
            router.push(`/${user.firstName+user.lastName}/dashboard`)
        } else {
            toast.error(`${message}`, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: theme === 'dark' ? 'colored' : 'light',
            });
        }
    }
    return {
        userProps,
        onChange,
        submitHandle
    }
}