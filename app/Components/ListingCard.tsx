"use client"
import { useRouter } from "next/navigation"
import { useCountries } from "../Hooks/useCountry"
import { useCallback, useMemo, useState } from "react"
import { format } from "date-fns"
import Image from "next/image"
import HeartButton from "./HeartButton"

interface ListingCardProps {
    data?: any,
    reservation?: any,
    disabled?: boolean,
    actionLabel?: String,
    actionId?: string,
    currentUser?: any,
    onAction?: (id: string) => void,
}


const ListingCard: React.FC<ListingCardProps> = ({
    data, reservation, disabled, actionId = "", currentUser, onAction, actionLabel
}) => {

    const router = useRouter()
    const { getByValue } = useCountries();

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {

        e.stopPropagation()
        if (disabled) { return }
        onAction?.(actionId)
    }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if (reservation) { return reservation.totalPrice }
        return data.price

    }, [reservation, data.price])

    const reservationDate = useMemo(() => {
        if (!reservation) { return null }

        const start = reservation.startDate;
        const end = reservation.endDate;

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])
    return (
        <div className="col-span-1 cursor-pointer group" onClick={() => router.push(`/Listing/${data.id}`)}>

            <div className=" flex flex-col gap-2 w-full">

                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image fill src={data.imageSrc} alt="Listing" className="obeject-cover h-full w-full group-hover:scale-110 transition" />
                    <HeartButton
                        currentUser={currentUser}
                        listingId={data.id} />
                </div>
                <div className="font-semibold text-lg">Region , Country</div>
                <div className="text-neutral-500 font-light">{reservationDate || data.category}</div>
                <div className="flex items-center gap-1">
                    <div className="font-semibold">${price}</div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}

                </div>
                {onAction && actionLabel && (
                    <button onClick={handleCancel} disabled={disabled}>{actionLabel}</button>
                )}
            </div>
        </div>
    )
}

export default ListingCard