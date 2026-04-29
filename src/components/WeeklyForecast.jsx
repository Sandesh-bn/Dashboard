import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function WeeklyForecast({ location }) {
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
        
        // Group by day
        const dailyMap = {};

        data.list.forEach((item) => {
          const date = new Date(item.dt * 1000);

          const day = date.toLocaleDateString([], {
            weekday: "short",
          });

          if (!dailyMap[day]) {
            dailyMap[day] = item;
          }
        });

        const formatted = Object.entries(dailyMap)
          .slice(0, 5)
          .map(([day, item]) => ({
            day,

            temp: `${Math.round(item.main.temp)}°F`,

            icon: item.weather[0].icon,

            description:
              item.weather[0].description,
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
      <div className="h-full w-full overflow-x-auto overflow-y-hidden bg-gray">
        <div className="flex h-full min-w-max gap-10 items-center">
            <h3>Weekly Forecast</h3>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-3 shrink-0"
            >
              <Skeleton className="h-5 w-12" />

              <Skeleton className="w-10 h-10 rounded-full" />

              <Skeleton className="h-5 w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-x-auto overflow-y-hidden text-gray">
      <div className="flex h-full min-w-max gap-10 items-center">
        {/* <h3 className="text-white text-sm font-semibold shrink-0">
          Weekly Forecast
        </h3> */}
        <h3>Weekly Forecast</h3>

        {forecast.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center shrink-0"
          >
            {/* Day */}
            <p className="text-gray-500 text-sm whitespace-nowrap">
              {item.day}
            </p>

            {/* Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.description}
              className="w-12 h-12 my-2"
            />

            {/* Temp */}
            <p className="text-gray text-sm">
              {item.temp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}