"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useLogInModel from "@/app/Hooks/useLogInModel";
import { signIn } from 'next-auth/react';
import toast from "react-hot-toast";


const LogInModal = () => {
    const LogInModel = useLogInModel();
    const [showModel, setShowModel] = useState(LogInModel.isOpen);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');

    const handleClose = () => {
        setShowModel(false);
        setTimeout(() => {
            LogInModel.onClose();
        }, 300);
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setIsLoading(true)
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
    .then((result:any)=>{
            setIsLoading(false)

            if(result?.ok){
                LogInModel.onClose
            toast.success("Logged in")
            handleClose();
            }
            else 
            toast.error(result?.error||"")
        })
    
        
    };

    useEffect(() => {
        setShowModel(LogInModel.isOpen);
    }, [LogInModel.isOpen]);

    return (
        <div>
            {showModel && (
                <div className="fixed bg-neutral-800/70 overflow-hidden inset-0 flex items-center justify-center z-50 outline-none">
                    <div className='relative bg-white rounded-lg shadow-lg md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto w-full z-30 p-6'>
                        <FontAwesomeIcon
                            onClick={handleClose}
                            icon={faClose}
                            width={30}
                            height={30}
                            className="absolute top-3 right-3 cursor-pointer"
                        />

                        <h2 className="text-xl font-bold mb-4 text-center">Log In</h2>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full px-4 py-2 border ${hasError ? 'border-rose-500' : 'border-black'} rounded`}
                                placeholder="Name"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-2 border ${hasError ? 'border-rose-500' : 'border-black'} rounded`}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-2 border ${hasError ? 'border-rose-500' : 'border-black'} rounded`}
                                placeholder="Password"
                                required
                            />
                            {hasError && <p className="text-rose-500">{error}</p>} {/* Display error message */}
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="mt-6 w-full bg-rose-500 text-center font-semibold rounded-md py-2 text-white hover:bg-rose-600 transition duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'} {/* Dynamic button text */}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogInModal ;
