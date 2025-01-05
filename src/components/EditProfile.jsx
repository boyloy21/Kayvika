'use client';
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileList = ({profiles}) => {
    const { data: session } = useSession();
    const Username = session?.user?.name;
    const router = useRouter();
    // const [loading, setLoading] = useState(false);
    console.log(Username);
    const handleClick = async (imagename) => {
        try {
            const response = await fetch('/api/Users/editprofile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: Username, imagename }),
            });
            if (response.ok) {
                router.push('/');
            } else {
                console.error('Error uploading image:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        } 
    }

    return(
        <>
            <h1 className="text-center text-3xl font-bold my-4">Please Select Your Profile</h1>
            <ul className="grid grid-cols-7 gap-4 list-none p-0">
                {profiles.map((profile) => (
                    <li key={profile.id}>
                        <Image onClick={() => handleClick(profile.id)} src={`/profiles/${profile.id}.jpeg`} alt={profile.name} width={120} height={120} className="cursor-pointer rounded-full border-2 border-black mt-2" />
                        <p className="text-xl">{profile.name}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ProfileList;