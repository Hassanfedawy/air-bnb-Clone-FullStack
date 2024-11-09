"use client"
import { useRouter } from "next/navigation"

interface EmptyStateProps{
    title?:string,
    subTitle?:string,
    showReset?:boolean
}

const EmptyState:React.FC<EmptyStateProps> = ({
    title="No exact matches",
    subTitle="Try changing or removing some of tour filters",
    showReset
})=>{

    const router = useRouter();
    return(
        <div className="h=[60vh] flex flex-col justify-center items-center gap-2">
            <div>
            <h2>{title}</h2>
            <h3>{subTitle}</h3>
            </div>
            {showReset&&
             <button className="w-48 mt-4 cursor pointer" onClick={()=>router.push("/")}>
                Reset filters
            </button>
            }

        </div>
    )
}

export default EmptyState