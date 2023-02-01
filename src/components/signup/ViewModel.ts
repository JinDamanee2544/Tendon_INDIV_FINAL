import { User } from "linkWithBackend/interfaces/TendonType";
import { useState } from "react";

export default function ViewModel(){
    const [userProps, setUserProps] = useState<User>({} as User);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isCal, setIsCal] = useState<boolean>(false);
    const onChangeFName = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ...userProps,
            firstName: e.currentTarget.value,
        });
    };
    const onChangeLName = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ...userProps,
            lastName: e.currentTarget.value,
        });
    };
    const onChangeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ...userProps,
            email: e.currentTarget.value,
        });
    };
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ...userProps,
            password: e.currentTarget.value,
        });
    };
    const onChangeConfirmPassword = (
        e: React.FormEvent<HTMLInputElement>
    ): void => {
        setConfirmPassword(e.currentTarget.value);
    };

    const onChange = (e:any) => {
        setUserProps({
            ...userProps,
            [e.target.name]: e.target.value,
        });
    }

    const submitHandle = (): void => {
        if (userProps.email === undefined) {
            setIsCal(false);
            alert("Email cannot be blank");
        } else if (userProps.firstName === undefined) {
            setIsCal(false);
            alert("Firstname cannot be blank");
        } else if (userProps.lastName === undefined) {
            setIsCal(false);
            alert("Lastname cannot be blank");
        } else if (userProps.password === undefined || userProps.password === "") {
            setIsCal(false);
            alert("Password cannot be blank");
        } else if (userProps.password !== confirmPassword) {
            setIsCal(false);
            alert("Password and Confirm Password must be the same.!!!");
        } else {
            console.log("right");
            setIsCal(true);
        }
    };

    return {
        isCal,
        userProps,
        onChange,
        onChangeConfirmPassword,
        submitHandle,
    }
}