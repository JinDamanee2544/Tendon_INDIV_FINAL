import Image from "next/image";

interface profileInterface {
    firstName: string,
    lastName: string,
}

const Profile = (props: profileInterface) => {
    return (
        <main className="flex gap-4 text-slate-700 dark:text-white items-center">
            <div className="h-20 w-20 rounded-full overflow-hidden flex justify-center items-center">
                <Image src={'/raiden.jpg'} alt='user-profile' width={100} height={100} />
            </div>
            <div className="h-full flex flex-col">
                <h1 className=" text-3xl font-bold"> {props.firstName} <br /> {props.lastName} </h1>
                <h2> Beginner User </h2>
            </div>
        </main>
    )
}
export default Profile;