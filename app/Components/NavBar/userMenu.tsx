"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import useRegisterModel from '@/app/Hooks/useRegisterModel';
import useLogInModel from '@/app/Hooks/useLogInModel';
import useRentModel from '@/app/Hooks/useRentModel';
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import {useCallback} from "react"
function UserMenu() {

    const [isOpen,setIsOpen]=useState(false);
    const { data: session } = useSession()

      const handleSignOut = () => {
        signOut({
          callbackUrl: "/", // Redirect URL after sign-out (optional)
        });
        toggle(isOpen)
        
      }
    const toggle=(value:boolean)=>{
        setIsOpen(!value)
    }
    const registermodel = useRegisterModel();
    const LogInModel:any    = useLogInModel();
    const RentModel=useRentModel();

    const onRent=useCallback(()=>{
      if(!session){
        return LogInModel.onOpen();
      }
      RentModel.onOpen()
    },[session,LogInModel])

  return (
    <div className=" flex space-x-4 items-center justify-end relative">

    <div
    onClick={onRent}
    className="px-3 py-4 rounded-full hover:bg-neutral-100 cursor-pointer hidden md:block text-sm font-semibold"> Airbnb your home</div>

    <div
      onClick={()=>{toggle(isOpen)}}
    className="flex cursor-pointer hover:shadow-md border-neutral-200 transition rounded-full border md:px-1 md:py-2">
    <FontAwesomeIcon  icon={faBars} height={30} width={30}/>

    <FontAwesomeIcon icon={faUser} height={30} width={30} className="hidden sm:block" />

    </div>
 
    {isOpen&&

        <div className="absolute w-40 rounded-xl shadow-md md:w-3/4 bg-white overflow-hidden text-sm top-12 right-0">
          {session?
           <div className="flex flex-col cursor-pointer" >
             <div onClick={()=>{}} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
               My trips
           </div>
           <div onClick={()=>{}} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
               My favorities
           </div>
           <div onClick={()=>{}} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
               My reservations
           </div>
           <div onClick={()=>{}} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
               My properties
           </div>
           <div onClick={RentModel.onOpen} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
               Airbnb my home
           </div>
           <div onClick={handleSignOut} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
               Logout
           </div>
          </div>
          :
          <div className="flex flex-col cursor-pointer">
                <div onClick={LogInModel.onOpen} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                    Log in
                </div>
                <div onClick={registermodel.onOpen} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                    Sign Up
                </div>
            </div>}
           
        </div>}
</div>

  )
}

export default UserMenu
