import { Skeleton } from "@/components/ui/skeleton";

export default function DetailedInfo({ weather, loading }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const weatherInfo = weather
    ? [
        {
          label: "Cloudiness (%)",
          value: weather.clouds?.all ?? "--",
        },
        {
          label: "UV Index",
          value: weather.uvi ?? "--",
        },
        {
          label: "Wind Direction",
          value: weather.wind?.deg ?? "--",
        },
        {
          label: "Pressure (hPa)",
          value: weather.main?.pressure ?? "--",
        },
        {
          label: "Sunrise",
          value: formatTime(weather.sys?.sunrise),
        },
        {
          label: "Sunset",
          value: formatTime(weather.sys?.sunset),
        },
      ]
    : [];

  return (
    <div className="h-full w-full  text-gray p-6 overflow-hidden">
      {/* Header */}
      <p className="text-sm font-bold mb-8">
        Additional Weather Info
      </p>

      {/* Content */}
      <div className="flex flex-col gap-5">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))
          : weatherInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <p className="text-gray-500 text-sm">
                  {item.label}
                </p>

                <p className="text-sm font-medium">
                  {item.value}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}