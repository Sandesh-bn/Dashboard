
import { Skeleton } from "@/components/ui/skeleton";
import { LocationDropDown } from "./LocationDropDown";
import { TypeDropDown } from "./TypeDropDown";
import imagemap from "../assets/imagemap";


export default function DayDetailsCard({ weather, location, setLocation, type, setType }) {
    const weatherclassMap = {
        "clear sky": "yellow-gradient",
        "few clouds": "lightblue-gradient",
        "scattered clouds": "lightgray-gradient",
        "broken clouds": "mediumgray-gradient",
        "shower rain": "lighgray-gradient",
        "rain": "lightblue-gradient",
        "thunderstorm": "yellow-gradient",
        "snow": "lightgray-gradient",
        "mist": "lightteal-gradient",
        "light intensity shower rain": "lightteal-gradient"
    };

    if (!weather) {
        return (
            <div className="h-full w-full p-4 flex flex-col overflow-hidden">
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

    const gradient = weatherclassMap[weather.weather[0].description]
    const icon = imagemap[weather.weather[0].description]
    console.log(weather.weather[0].description, ' ', gradient);
    return (
        <div className={`h-full w-full text-gray-500 p-2 flex flex-col overflow-hidden ${gradient}`}>
            {/* Header */}
            {/* <h2 className="text-1xl font-bold shrink-0 items-center"> */}
            <div className="flex pt-2 flex-wrap gap-3 sm:gap-4 lg:gap-5">
                <LocationDropDown className="items-center" location={location} setLocation={setLocation} />
                <TypeDropDown type={type} setType={setType} />
            </div>
            {/* </h2> */}

            {/* Main Content */}
            <div className="flex-1 flex flex-wrap gap-2 sm:gap-5 items-center justify-center min-h-0 py-6 lg:py-3">
                <div className="text-4xl sm:text-5xl xl:text-4xl my-1 font-semibold leading-none">
                    {Math.round(weather.main.temp)}°F
                </div>

                {/* <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    className="w-16 h-16 sm:w-20 sm:h-20"
                /> */}
                <div>
                    <img src={icon} className="h-20" />

                    <div className="text-sm sm:text-sm font-bold text-center capitalize">
                        {weather.weather[0].description}
                    </div>
                </div>

                <div className="text-lg sm:text-xl font-semibold mt-0 text-green-600">
                    <p className="text-sm text-green-400">
                        Local Time
                    </p>
                    {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-center shrink-0">
                <div>
                    <p className="text-sm text-gray-400">
                        Feels like
                    </p>

                    <p className="text-xl sm:text-2xl font-medium mt-1">
                        {Math.round(weather.main.feels_like)}°F
                    </p>
                </div>

                <div>
                    <p className="text-sm text-violet-400">
                        Humidity
                    </p>

                    <p className="text-xl sm:text-2xl text-violet-600 font-medium mt-1">
                        {weather.main.humidity}%
                    </p>
                </div>

                <div>
                    <p className="text-sm text-blue-400">
                        Wind Speed
                    </p>

                    <p className="text-xl sm:text-2xl text-blue-600 font-medium mt-1">
                        {Math.round(weather.wind.speed)} mph
                    </p>
                </div>
            </div>
        </div>
    );
}

