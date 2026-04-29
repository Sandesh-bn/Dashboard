
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LocationDropDown } from "./LocationDropDown";
import { TypeDropDown } from "./TypeDropDown";

export default function DayDetailsCard({ weather, location, setLocation, type, setType }) {
    
    if (!weather) {
        return (
            <div className="w-[500px] h-full shrink-0 p-4 flex flex-col overflow-hidden">
                {/* Header */}
                <Skeleton className="h-8 w-48 mb-6" />

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <Skeleton className="h-16 w-40" />

                    <Skeleton className="w-20 h-20 rounded-full" />

                    <Skeleton className="h-8 w-32" />

                    <Skeleton className="h-5 w-24" />

                    <Skeleton className="h-10 w-40" />
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-16" />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-16" />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[500px] h-full shrink-0 text-gray-500 p-4 flex flex-col overflow-hidden">
            {/* Header */}
            {/* <h2 className="text-1xl font-bold shrink-0 items-center"> */}
            <div className="flex gap-10">
                <LocationDropDown className="items-center" location={location} setLocation={setLocation} />
                <TypeDropDown type={type} setType={setType}/>
            </div>
            {/* </h2> */}

            {/* Main Content */}
            <div className="flex-1 flex gap-5  items-center justify-center min-h-0">
                <div className="text-5xl my-1 xl:text-4xl font-semibold leading-none">
                    {Math.round(weather.main.temp)}°F
                </div>

                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    className="w-20 h-20"
                />

                <div className="text-xl font-medium text-center capitalize">
                    {weather.weather[0].description}
                </div>


                <div className="text-xl font-semibold mt-0">
                    <p className="text-sm text-gray-400">
                        Local Time
                    </p>
                    {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-center shrink-0">
                <div>
                    <p className="text-sm text-gray-400">
                        Feels like
                    </p>

                    <p className="text-2xl font-medium mt-1">
                        {Math.round(weather.main.feels_like)}°F
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">
                        Humidity
                    </p>

                    <p className="text-2xl font-medium mt-1">
                        {weather.main.humidity}%
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">
                        Wind Speed
                    </p>

                    <p className="text-2xl font-medium mt-1">
                        {Math.round(weather.wind.speed)} mph
                    </p>
                </div>
            </div>
        </div>
    );
}

