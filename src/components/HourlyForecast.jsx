import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function HourlyForecast({ location }) {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchForecast() {
            try {
                setLoading(true);

                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${API_KEY}`
                );

                const data = await res.json();

                const formatted = data.list.slice(0, 12).map((item) => ({
                    time: new Date(item.dt * 1000).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                    }),

                    temp: `${Math.round(item.main.temp)}°F`,

                    icon: item.weather[0].icon,
                }));

                setForecast(formatted);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchForecast();
    }, [location]);

    if (loading) {
        return (
            <div className="h-full w-full overflow-x-auto custom-scrollbar overflow-y-hidden black">
                <div className="flex h-full min-w-max gap-10 items-center">
                    <h3>Hourly Forecast</h3>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center shrink-0"
                        >
                            {/* Time Skeleton */}
                            <Skeleton className="h-5 w-10" />

                            {/* Dot Skeleton */}
                            <Skeleton className="w-4 h-4 rounded-full my-4" />

                            {/* Temp Skeleton */}
                            <Skeleton className="h-5 w-10" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full overflow-x-auto custom-scrollbar overflow-y-hidden black">
            <div className="flex h-full min-w-max gap-10 items-center ">
                <h3>Hourly Forecast</h3>
                {forecast.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center shrink-0"
                    >
                        {/* Time */}
                        <p className="text-gray-600 text-sm whitespace-nowrap">
                            {item.time}
                        </p>

                        {/* Dot */}
                        <div
                            className={`w-4 h-4 rounded-full my-4 ${item.active
                                    ? "bg-orange-400"
                                    : "bg-gray-600"
                                }`}
                        />

                        {/* Temp */}
                        <p className="text-gray-600 text-sm">
                            {item.temp}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}