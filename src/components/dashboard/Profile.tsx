import Image from "next/image";

interface profileInterface {
    firstName: string,
    lastName: string,
}

const Profile = (props: profileInterface) => {
    return (
        <main className="flex items-center gap-4 text-slate-700 dark:text-white">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
                <Image src={'/raiden.jpg'} alt='user-profile' width={100} height={100} />
            </div>
            <div className="flex h-full flex-col">
                <h1 className=" text-3xl font-bold"> {props.firstName || 'Unknown Name'} <br /> {props.lastName} </h1>
                <h2> Beginner User </h2>
            </div>
        </main>
    )
}
export default Profile;