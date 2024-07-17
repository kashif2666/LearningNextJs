"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios'
import {toast} from "react-hot-toast";

export default function SignUpPage() {
  const router=useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled]=React.useState(false);
  const [loading, setLoading]=React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response=await axios.post("/api/users/signup",user);
      console.log("SignUp Success",response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("Signup failed",error.message);
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
if (user.email.length>0 && user.password.length>0 && user.username.length>0) {
  setButtonDisabled(false);
}else{
  setButtonDisabled(true);
}
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center  text-2xl">{loading?"Processing":"SignUp"}</h1>
      <hr />
      <label htmlFor="username">userName</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="UserName"
      />
        <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      
       <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      <button onClick={onSignUp} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled? "No SignUp":"SignUp"}</button>
      <Link href="/login">Already have an account ?</Link>
    </div>
  );
}
