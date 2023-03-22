import TYPES, { User } from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import AuthService from "linkWithBackend/services/auth_service";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const authService = container.get<AuthService>(TYPES.AuthService)

export default function ViewModel(){
    const router = useRouter();
    const {theme} = useTheme();
    const [userProps, setUserProps] = useState<User>({} as User);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    
    const onChangeConfirmPassword = (
        e: FormEvent<HTMLInputElement>
    ): void => {
        setConfirmPassword(e.currentTarget.value);
    };

    const onChange = (e:any) => {
        setUserProps({
            ...userProps,
            [e.target.name]: e.target.value,
        });
    }

    const errorNotify = (message:string) => {
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

    const isPassClientValidate = () :boolean => {
        if (userProps.password !== confirmPassword) {
            errorNotify("Password and Confirm Password must be the same.");
            return false;
        }
        return true 
    }

    const submitHandle = (e:FormEvent) => {
        e.preventDefault();
        if (!isPassClientValidate()) {
            return;
        }
        signUp();
    }

    const signUp = async() => {
        const response = await authService.signUp(userProps)
        const message = authService.getMessage()
        const status = authService.getStatus()

        if (status === 201) {
            router.push(`/${userProps.firstName+userProps.lastName}/dashboard`)
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
        confirmPassword,
        userProps,
        onChange,
        onChangeConfirmPassword,
        submitHandle,
    }
}