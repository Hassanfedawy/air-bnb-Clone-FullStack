"use client"

import { useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus,faPlus } from "@fortawesome/free-solid-svg-icons"

interface CounterProps{
title:String,
subTitle:string,
value:number,
onChange:(value:number)=>void
}

export const Counter:React.FC<CounterProps>=({title,subTitle,value,onChange})=>{

    const onAdd=useCallback(()=>{
        onChange(value+1)
    },[onChange,value])

    const onReduce=useCallback(()=>{
        if(value===1){return}
        onChange(value-1)
    },[onChange,value])
    return (
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <div className="font-medium">{title}</div>
                    <div className="font-light text-gray-600">{subTitle}</div>
                </div>

                <div className="flex items-center gap-4">
                    <div onClick={onReduce} className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
                        <FontAwesomeIcon icon={faMinus} size="lg"/>
                    </div>

                    <div className="font-light text-xl text-neutral-600">
                        {value}
                    </div>

                    <div onClick={onAdd} className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
                        <FontAwesomeIcon icon={faPlus} size="lg"/>
                    </div>
                </div>

            </div>
    )
  }

