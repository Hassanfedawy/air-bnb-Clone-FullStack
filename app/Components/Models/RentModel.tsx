"use client";
import { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faDollar } from "@fortawesome/free-solid-svg-icons";
import useRentModel from "@/app/Hooks/useRentModel";
import { categories } from "../NavBar/Categories";
import Select from "react-select";
import { useCountries } from "@/app/Hooks/useCountry";
import dynamic from "next/dynamic";
import { ImageUpload } from "../Inputs/ImageUpload";
import { Counter } from "../Inputs/Counter";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const MapComponent = dynamic(() => import("@/app/Map"), { ssr: false });

enum Steps {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModel = () => {
    const RentModel = useRentModel();
    const [showModel, setShowModel] = useState(RentModel.isOpen);
    const [step, setStep] = useState(Steps.CATEGORY);
    const [isLoading , setIsLoading] = useState(false);
    const [HasError ,setHasError] = useState(false);

    const [category, setCategory] = useState("");
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [guestsCount, setGuestsCount] = useState(1);
    const [roomsCount, setRoomsCount] = useState(1);
    const [bathRoomsCount, setBathRoomsCount] = useState(1);
    const [imageSrc, setImageSrc] = useState(""); // Keep track of uploaded image in parent state
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [price , setPrice] = useState(1);

    const router = useRouter();

    const handleClose = () => {
        setShowModel(false);
        setTimeout(() => {
            RentModel.onClose();
        }, 300);
    };

    useEffect(() => {
        setShowModel(RentModel.isOpen);
    }, [RentModel.isOpen]);

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        if (step === Steps.IMAGES && !imageSrc) {
            alert("Please upload an image before proceeding.");
            return;
        }
        setStep((value) => value + 1);
    };

    const reset=()=>{
        setCategory("")
        setBathRoomsCount(1)
        setDescription("")
        setGuestsCount(1)
        setImageSrc("")
        setLocation({ lat: 0, lng:1})
        setPrice(1)
        setRoomsCount(1)
        setTitle("")

    }

    const onSubmit = () => {
        if (step !== Steps.PRICE) {
            return onNext();
        }
    
        // Validate required fields
        if (!category || !location || !title || !description || price <= 0) {
            toast.error("Please fill out all fields correctly.");
            return;
        }
    
        setIsLoading(true);
        toast.dismiss();
        
        const payload = {
            category,
            location,
            guestsCount,
            roomsCount,
            bathRoomsCount,
            imageSrc,
            title,
            description,
            price,
        };
        
        axios.post("/api/Listing", payload)
            .then(() => {
                toast.success("Listing Created!");
                setHasError(false);
                router.refresh();
                reset();
                setStep(Steps.CATEGORY);
                handleClose();
            })
            .catch((error) => {
                // Improved error handling
                const errorMessage = error.response?.data?.message || "Listing failed. Please try again.";
                toast.error(errorMessage);
                setHasError(true); // Set error state on failure
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    

    const actionLabel = useMemo(() => {
        return step === Steps.PRICE ? "Create" : "Next";
    }, [step]);

    const secondaryLabel = useMemo(() => {
        return step === Steps.CATEGORY ? undefined : "Back";
    }, [step]);

    const handleClick = (label: string) => {
        setCategory(prevCategory => prevCategory === label ? "" : label);
    };

    const { getAll } = useCountries();

    let body = (
        <div className="flex flex-col gap-8">
            <div>
                <h2>Which of these best describes your place!</h2>
                <h4>Pick a category</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div
                        onClick={() => handleClick(item.label)}
                        key={item.label}
                        className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
                            category === item.label ? "border-black" : "border-neutral-200"
                        }`}
                    >
                        <FontAwesomeIcon icon={item.icon} width={40} height={40} />
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === Steps.LOCATION) {
        body = (
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <h2>Where is your place located?</h2>
                    <h4>Help guests find you</h4>
                </div>
                <Select
                    placeholder="Anywhere"
                    isClearable
                    options={getAll()}
                    formatOptionLabel={(option: any) => (
                        <div className="flex items-center gap-3">
                            <div>{option.flag}</div>
                            <div>
                                {option.label}, <span className="text-neutral-500 ml-1">{option.region}</span>
                            </div>
                        </div>
                    )}
                    onChange={(option: any) => {
                        setLocation(option ? { lat: option.latlng[0], lng: option.latlng[1] } : null);
                    }}
                    classNames={{
                        control: () => "p-3 border-2",
                        input: () => "text-lg",
                        option: () => "text-lg",
                    }}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 6,
                        colors: {
                            ...theme.colors,
                            primary: "black",
                            primary25: "#ffe4e6",
                        },
                    })}
                />
                <MapComponent center={location ? [location.lat, location.lng] : undefined} />
            </div>
        );
    }

    if (step === Steps.INFO) {
        body = (
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <h2>Share some basics about your place</h2>
                    <h4>What amenities do you have?</h4>
                </div>
                <Counter title="Guests" subTitle="How many guests do you allow?" value={guestsCount} onChange={setGuestsCount} />
                <hr />
                <Counter title="Rooms" subTitle="How many rooms do you have?" value={roomsCount} onChange={setRoomsCount} />
                <hr />
                <Counter title="Bathrooms" subTitle="How many bathrooms do you have?" value={bathRoomsCount} onChange={setBathRoomsCount} />
            </div>
        );
    }

    if (step === Steps.IMAGES) {
        body = (
            <div className="flex flex-col gap-8">
                <div>
                    <h2>Add a Photo for your place</h2>
                    <h3>Show guests what your place looks like!</h3>
                </div>
                <ImageUpload value={imageSrc} onChange={ setImageSrc} />
            </div>
        );
    }

    if(step===Steps.DESCRIPTION){

        body=(
            <div className="flex flex-col gap-8">
                <div>
                    <h2>How would you descripe your place?</h2>
                    <h3>Short and sweet works best!</h3>
                </div>
                <div className="flex flex-col space-y-8">
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full p-4 border`}
                                placeholder="Title"
                                required
                            />
                            <input
                                type="text"
                                name="description}"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`w-full p-4 border`}
                                placeholder="Description"
                                required
                            />

                        </div>


            </div>
        )
    }

    if(step===Steps.PRICE){

        body=(
            <div className="flex flex-col gap-8">

                <div>
                    <h2>Now,set your price</h2>
                    <h3>How much do you charge per night</h3>
                </div>
                <div className="flex relative">
                    <FontAwesomeIcon 
                        icon={faDollar} 
                        size="lg"  
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-neutral-400" 
                    />
                    <input
                        type="number"
                        name="price"  // Assuming this is meant to represent a price input
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        className="w-full pl-12 p-4 border rounded-md"  // Adjust left padding
                        placeholder="Price"
                        required
                    />
                </div>

            </div>
        )
    }

    return (
        <div>
            {showModel && (
                <div className="fixed bg-neutral-800/70 overflow-hidden inset-0 flex items-center justify-center z-50 outline-none">
                    <div className="relative bg-white rounded-lg shadow-lg md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto w-full z-30 p-6">
                        <FontAwesomeIcon
                            onClick={handleClose}
                            icon={faClose}
                            width={30}
                            height={30}
                            className="absolute top-3 right-3 cursor-pointer"
                        />
                        <h2 className="text-xl font-bold mb-4 text-center">Airbnb your home</h2>
                        <div>{body}</div>
                        <div className="flex gap-16">
                            {secondaryLabel && (
                                <button
                                    onClick={onBack}
                                    className="mt-6 w-full bg-rose-500 text-center font-semibold rounded-md py-2 text-white hover:bg-rose-600 transition duration-200 flex-grow"
                                >
                                    {secondaryLabel}
                                </button>
                            )}
                            <button
                                onClick={onSubmit}
                                className="mt-6 w-full bg-rose-500 text-center font-semibold rounded-md py-2 text-white hover:bg-rose-600 transition duration-200 flex-grow"
                            >
                                {actionLabel}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RentModel;
