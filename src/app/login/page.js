"use client";

import Link from "next/link";
import {Form, FormControl, Button, FormLabel, FormGroup} from "react-bootstrap";
import './styles.css'
import { useForm } from "react-hook-form";
import { useState } from "react";
import {useRouter} from "next/navigation";
import Alert from "@/components/alerts/alert";

export default function LoginPage() {
   const {register, getValues} = useForm();
   const router = useRouter();
   const handleSiginClick = () => {
      const fromValues = getValues();
      const storageUsers = localStorage.getItem("users");
      if (!storageUsers) {
         alert("User not found");
         return;
      }
      const users = JSON.parse(storageUsers);
      if (!users || !users.length) {
         alert("User not found");
         return;
      }
      // Find the user that matches the username and password
  
      const userInfo = users.find((user) => {
         if (user.username == fromValues.username && user.password === fromValues.password) {
            return user;
         }
      })
      if (userInfo ) {
         alert("User is signed in");
         localStorage.setItem("currentUser", JSON.stringify(userInfo));
         router.push("/");
      } else {
         alert("User not found");
       }
   }

   const handleClose = () => {
      router.push("/"); // Redirect to home page
   };

   return (
      <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
         <div className="w-full h-screen flex  items-center justify-center bg-black bg-opacity-25 ">
            <aside className="bg-white w-full max-w-md rounded-xl bg-opacity-20 shadow-lg shadow-black">
               <div className="m-0 p-4 bg-sky-800 rounded-t-xl flex justify-between align-center">
                  <h1 className="text-center text-white font-bold text-4xl font-light px-2 ">Please Log-In</h1>
                  <button type="button" onClick={handleClose} className="text-white text-center font-bold text-4xl bg-lime-500 rounded-lg w-10 h-10 transition hover:bg-lime-500/50">&times;</button>
               </div>
               <div>
                  <Form className="p-6 bg-sky-400">
                     <div className="mt-3">
                        <label>username</label>
                        <input type="username" placeholder="username" {...register("username")} className="py-2 px-3 w-full text-black text-lg font-light outline-none "/>
                     </div>
                     {/* <div className="mt-3">
                        <label>Email</label>
                        <input type="email" placeholder="Email" {...register("email")} className="py-2 px-3 w-full text-black text-lg font-light outline-none "/>
                     </div> */}
                     <div className="mt-3">
                        <label>Password</label>
                        <input type="password" placeholder="Password" {...register("password")}  className="py-2 px-3 w-full text-black text-lg font-light outline-none " />
                     </div>
                     <div className="mt-1">
                        <input type="checkbox" {...register("remember")}/>
                        <label className="ml-2">Remember Me</label>
                     </div>
                     <div className="flex mt-5 justify-between items-center">
                        <Link href="/register" className="text-white cursor-pointer transition hover:text-blue underline-offset-2">
                                Don&apos;t have an account? Sign up
                        </Link>
                        <button type="submit" onClick={handleSiginClick} className="bg-sky-500 font-bold text-white rounded-md px-8 py-2 transition hover:bg-sky-500/50 " >Login</button>
                     </div>
                  </Form>
               </div>
            </aside>
         </div>
      </main>
      
   );
}