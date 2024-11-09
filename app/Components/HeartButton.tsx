"use client"
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'  // Outlined heart
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'      // Solid heart
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

interface HeartButtonProps{
    listingId:any,
    currentUser:any
}

const HeartButton:React.FC<HeartButtonProps> = ({listingId, currentUser}) => {

    const [isFav, setIsFav] = useState(false)

    return (
        <div 
            className="relative hover:opacity-80 transition cursor-pointer"
            onClick={() => setIsFav(!isFav)} // Toggle between filled and outline on click
        >
            <FontAwesomeIcon 
                icon={isFav ? faHeartSolid : faHeartOutline} 
                size="xl" 
                className={`
                    absolute top-3 right-3 
                    ${isFav ? 'text-red-500' : 'text-white fill-neutral-500'} 
                    ${isFav ? 'scale-110' : ''} 
                    transition-all
                `}
            />
        </div>
    )
}

export default HeartButton
