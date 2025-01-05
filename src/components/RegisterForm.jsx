// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// export default function RegisterForm() {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const router = useRouter();
//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         if (!username || !email || !password) {
//           setError("All fields are necessary.");
//           return;
//         }
    
//         try {
//           const resUserExists = await fetch("api/userExists", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email }),
//           });
    
//           const { user } = await resUserExists.json();
    
//           if (user) {
//             setError("User already exists.");
//             return;
//           }
    
//           const res = await fetch("api/register", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               username,
//               email,
//               password,
//             }),
//           });
    
//           if (res.ok) {
//             const form = e.target;
//             form.reset();
//             alert("User registered successfully!");
//             router.push("/");
//           } else {
//             console.log("User registration failed.");
//           }
//         } catch (error) {
//           console.log("Error during registration: ", error);
//         }
//       };

//     return (
//         <div className="flex flex-col items-center  justify-center h-screen bg-blue-400 p-6">
//             <div className="relative w-full max-w-md p-6 bg-white rounded-lg  shadow-lg">
//                 <button type="button" onClick={() => router.push("/")} className="text-white text-center font-bold text-4xl bg-lime-500 rounded-lg w-10 h-10 transition hover:bg-lime-500/50">&times;</button>
//                 <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Register</h1>
//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <input
//                         type="text"
//                         placeholder="username"
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button  className="w-50 bg-lime-500 hover:bg-lime-500/50 text-white font-bold py-2 px-4 rounded text-center text-2xl border-2 border-lime-500 text-white">
//                         Register
//                     </button>
//                     {error && (
//                     <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
//                     {error}
//                     </div>
//                     )}
//                     <Link className="text-sm mt-3 text-right text-gray-500" href={"/login"}>
//                     Already have an account? <span className="underline">Login</span>
//                     </Link>
//                 </form>
//             </div>
//         </div>
//     )
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (res.ok) {
        alert("User registered successfully");
        router.push("/");
      } else {
        setError("User registration failed.");
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-xl shadow-blue-700/50 p-4 rounded-lg border-t-4  border-green-400">
        <div className="m-0 p-4 bg-sky-600 rounded-t-xl flex justify-between w-full">
          <h1 className="text-center justify-center text-white  text-4xl font-bold px-2 items-center">Please Registration</h1>
          {/* <button
            type="button"
            onClick={() => router.push("/")}
            className="text-white text-center font-bold text-4xl bg-lime-500 rounded-lg w-10 h-10 transition hover:bg-lime-500/50 items-end"
          >
            &times;
          </button> */}
        </div>
        

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-3">
          <div className="mt-2 flex flex-col">
            <label className="text-white">Username</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Username"
              className="border-2 border-gray-200 rounded-md py-2 px-2"
            />
          </div>
          
          <div className="mt-2 flex flex-col">
            <label className="text-white">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="border-2 border-gray-200 rounded-md py-2 px-2"
            />
          </div>
          
          <div className="flex flex-col mt-2">
            <label className="text-white">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border-2 border-gray-200 rounded-md py-2 px-2"
            />
          </div>
          
          <button className="bg-green-600 hover:bg-green-600/50 text-white font-bold cursor-pointer px-6 py-2 rounded-lg border-2 border-white">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-xl mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}