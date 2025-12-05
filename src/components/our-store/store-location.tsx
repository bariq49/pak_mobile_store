"use client"
import cn from "classnames";
import {StoreType} from "@/services/types";
import {useState} from "react";
import { MapPin } from "lucide-react"
import Scrollbar from "../shared/scrollbar";
import getLocation from "@/utils/get-location";

interface storesProps {
    dataStores?: any;
}

const StoresLocation: React.FC<storesProps> = ({
                                                   dataStores,
    }) => {
    const [selectedLocationId, setSelectedLocationId] = useState(dataStores[0].id);
    
    // Get the currently selected location
    const selectedLocation = dataStores.find((store: StoreType) => store.id === selectedLocationId) || dataStores[0];
   
    return (
        <div className="flex flex-col lg:flex-row lg:flex-row-reverse gap-5 lg:gap-10">
            <div className="lg:basis-2/3 overflow-hidden relative">
                <div className="absolute top-3 left-3 z-10 bg-white px-3 py-2 rounded-lg shadow-lg">
                    <p className=" text-brand-dark">Store: {selectedLocation.name}</p>
                </div>
                <iframe
                    src={getLocation(selectedLocation.location)}
                    width="100%"
                    height="100%"
                    style={{border: 0}}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full min-h-[400px]"
                    title={`Map of ${selectedLocation.name}`}
                />
            </div>
            <div className="lg:basis-1/3 ">
                <Scrollbar >
                    <div className="w-full max-h-[450px] lg:max-h-[850px] space-y-4">
                        {dataStores.slice(0, 4)?.map((store: StoreType) => {
                            const isSelected = store.id === selectedLocationId

                            return (
                                <div
                                    key={store.id}
                                    className={cn(
                                        "p-6 rounded-lg  cursor-pointer",
                                        isSelected ? "bg-black text-white border-black" : "bg-white border border-gray-200 text-brand-dark",
                                    )}
                                    onClick={() => setSelectedLocationId(store.id)}
                                    aria-selected={isSelected}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            setSelectedLocationId(store.id)
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className={cn("h-5 w-5 hidden", isSelected  && "sm:block text-white")}/>
                                        <h2 className={`text-lg font-medium`}>{store.name}</h2>
                                       
                                    </div>
        
                                    <div className="space-y-2 text-15px leading-6">
                                        <div>
                                            <p className={`font-medium mb-0`}>Address</p>
                                            <p>{store.address}</p>
                                        </div>
                                        
                                        <div>
                                            <p className={`font-medium mb-0`}>Phone</p>
                                            <p>{store.phoneNumber || "(+1) 123-456-7890"}</p>
                                        </div>
                                        
                                    
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Scrollbar>
            </div>

            
        </div>
    );
}
export default StoresLocation;