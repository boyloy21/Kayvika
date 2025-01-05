'use client';
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const { data: session } = useSession();
    const username = session?.user?.name;
    const router = useRouter();

    useEffect(() => {
        if (!username) {
            router.push('/');
        }
    }, [username, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Logout Confirmation</h1>
                <div className="text-lg text-gray-700 space-y-4">
                    <div>
                        <span className="font-semibold text-gray-900">Name:</span> {session?.user?.name}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">Email:</span> {session?.user?.email}
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => signOut()}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
