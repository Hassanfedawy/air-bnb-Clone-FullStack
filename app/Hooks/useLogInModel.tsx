import {create} from 'zustand'

interface LogInModelStore{
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void
}

const useLogInModel= create<LogInModelStore>((set)=>({
    
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}
))

export default useLogInModel