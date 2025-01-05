// "use client";
// import Link from "next/link";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {Form, FormControl, Button, FormLabel, FormGroup} from "react-bootstrap";
// import "./styles.css"
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import {useRouter} from "next/navigation";
// import Alert from "@/components/alerts/alert";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// export default function Register() {
//    const validationSchema = Yup.object().shape({
//       username: Yup.string()
//         .required('Username is required')
//         .min(2, 'Username must be at least 6 characters')
//         .max(10, 'Username must not exceed 20 characters'),
//       email: Yup.string()
//         .required('Email is required')
//         .email('Email is invalid'),
//       password: Yup.string()
//         .required('Password is required')
//         .min(6, 'Password must be at least 6 characters')
//         .max(10, 'Password must not exceed 40 characters'),
//       confirmPassword: Yup.string()
//         .required('Confirm Password is required')
//         .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
//       acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
//     });
//    const {register,handleSubmit, getValues, reset, formState: {errors}} = useForm({resolver: yupResolver(validationSchema)});
//    const [show, setShow] = useState(false);
//    const router = useRouter();
//    const {handlerAlertClick, handlerSuccessClick, handlerErrorClick, handlerInfoClick, handlerConfirmClick, handlerPromptClick} = Alert();
   
//    const onSignup = () => {
//       const {username, email, password , confirmPassword, acceptTerms} = getValues();
//       const user = { username, email, password , confirmPassword, acceptTerms};
      
//       if (localStorage.getItem("users")) {
//          const users = JSON.parse(localStorage.getItem("users")||`[]`);
//          const allUsers = [...users, user];
//          localStorage.setItem("users", JSON.stringify(allUsers));
//       }
//       else {
//          localStorage.setItem("users", JSON.stringify([user]));
//       }
//       if (!username || !email || !password || !confirmPassword || !acceptTerms) {
//          handlerErrorClick("Please fill in all fields");
//          return;
//       }
//       else{
//          handlerSuccessClick("User created successfully");
//       }
      
//    }

//    const handleClose = () => {
//       router.push("/"); // Redirect to home page
//    };
//    const onSubmit = data => {
//       console.log(JSON.stringify(data, null, 2));
//     };

//     return(
//        <>
//         <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
//             <div className="w-full h-screen flex  items-center justify-center bg-black bg-opacity-25">
//                <aside className="bg-white w-full max-w-md rounded-xl bg-opacity-20 shadow-lg shadow-black">
//                   <div className="m-0 p-4 bg-sky-800 rounded-t-xl flex justify-between ">
//                      <h1 className="text-center text-white font-bold text-4xl font-light px-2 items-center">Please Registration</h1>
//                      <button type="button" onClick={handleClose} className="text-white text-center font-bold text-4xl bg-lime-500 rounded-lg w-10 h-10 transition hover:bg-lime-500/50 items-end">&times;</button>
//                   </div>
//                   <div  className="p-6 bg-sky-400">
//                      <form  onSubmit={handleSubmit(onSubmit)}>
//                         <div className="mt-3">
//                            <label>User Name</label>
//                            <input name="username" type="username" placeholder="username" {...register("username", )} 
//                               // className="py-2 px-3 w-full text-black text-lg font-light outline-none "
//                               className={`form-control ${errors.username ? 'is-invalid' : ''}`}/>
//                            <div className="invalid-feedback">{errors.username?.message}</div>
//                         </div>
//                         <div className="mt-3">
//                            <label>Email</label>
//                            <input name="email" type="email" placeholder="Email" {...register("email")} 
//                            // className="py-2 px-3 w-full text-black text-lg font-light outline-none "
//                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
//                            <dev className="invalid-feedback">{errors.email?.message}</dev>
//                         </div>
//                         <div className="mt-3">
//                            <label>Password</label>
//                            <input name="password" type="password" placeholder="Password" {...register("password")} 
//                            // className="py-2 px-3 w-full text-black text-lg font-light outline-none "/>
//                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
//                            <dev className="invalid-feedback">{errors.password?.message}</dev>
//                         </div>
//                         <div className="mt-3">
//                            <label>Confirm Password</label>
//                            <input name="confirmPassword" type="password" placeholder="Comfrim-Password" {...register("confirmPassword")} 
//                            // className="py-2 px-3 w-full text-black text-lg font-light outline-none "
//                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
//                            />
//                            <dev className="invalid-feedback">{errors.confirmPassword?.message}</dev>
//                         </div>
//                         <div className="mt-1">
//                            <input name ="acceptTerms" type="checkbox" {...register('acceptTerms')} 
//                            className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
//                            />
//                            <label className="ml-2">I have read and accept the terms</label>
//                         </div>
//                         <div className="flex mt-5 justify-between">
//                            <button type="submit" onClick={onSignup} className="bg-sky-500 font-bold text-white px-8 py-2 rounded-md transition hover:bg-sky-500/50 ">Sign Up</button>
//                            <button type="button" onClick={reset} className="btn btn-warning float-right text-white font-bold ">Reset</button>
//                         </div>
//                      </form>
//                      <div className="flex mt-5 justify-between items-center">
//                         <Link href="/login" className="text-white cursor-pointer transition hover:text-blue underline-offset-2">Already have an account?Sign In</Link>
//                      </div>
//                   </div>
//                </aside>
//             </div>
//          </main>
         
         
//       </>
//     )
// }
import RegisterForm from "@/components/RegisterForm";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Register() {
//   const session = await getServerSession(authOptions);

//   if (session) redirect("/dashboard");

  return <RegisterForm />;
}