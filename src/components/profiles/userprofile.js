"use client";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function UserProfile() {
    const users = JSON.parse(localStorage.getItem("users"));
    const router = useRouter();
    const handleClose = () => {
        router.push("/home");
    }
    return (
        <>
            <div className="sub-menu">
                <div className="user-info">
                  <Image className="place-items-start account-img" src="/profile.png" alt="account" width={40} height={40} />
                  <h4 className="mr-3">{users.username}</h4>
                  <button type="button" onClick={handleClose} className="text-white items-center justify-center bg-lime-500 rounded-none w-5 h-5 transition hover:bg-lime-500/50 place-items-end">&times;</button>
                </div>
                <hr className="w-40 h-1 mt-1 mb-1"/>
                  <Link href="/account/edit-profile" className="sub-menu-link">
                  <i className="mr-1 bi bi-pencil"></i>
                    <p>Edit Profile</p>
                  </Link>
                  <Link href="#" className="sub-menu-link">
                    <i className="mr-1 bi bi-moon"></i>
                    <p>Dark Mode</p>
                  </Link>
                  <Link href="#" className="sub-menu-link">
                    <i className="mr-1 bi bi-gear"></i>
                    <p>Setting</p>
                  </Link>
                  
                  <Link href="#" className="sub-menu-link">
                    <i className="mr-1  bi bi-box-arrow-right"></i>
                    <p>Logout</p>
                  </Link>
              </div>
        </>
    )
}


