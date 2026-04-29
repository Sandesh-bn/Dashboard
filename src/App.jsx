import { useState, useEffect } from 'react'
import './App.css'
import CityMap from './components/CityMap'
import DayDetailsCard from './components/DayDetailsCard'
import HourlyForecast from './components/HourlyForecast'
import DetailedInfo from './components/DetailedInfo'
import WeeklyForecast from './components/WeeklyForecast'
const API_KEY = import.meta.env.VITE_API_KEY;


export default function App() {
  const [location, setLocation] = useState('Los Angeles');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [type, setType] = useState('clouds_new')
  
  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`
        );

        const data = await res.json();

        setWeather(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [location]);


  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col p-3 sm:p-4 lg:h-screen lg:overflow-hidden lg:p-5 gap-4 lg:gap-5 light-background">
      {/* Row 1 */}
      <section
        id="location"
        className="flex min-h-0 flex-col gap-4 lg:h-1/2 lg:flex-row lg:overflow-hidden lg:gap-7"
      >
        {/* Left Column */}
        <div className="h-[320px] shrink-0 overflow-hidden rounded-[10px] light-card sm:h-[380px] lg:h-auto lg:min-h-0 lg:flex-1 lg:shrink">
          <CityMap location={location} type={type} />
        </div>

        {/* Right Column */}
        <div className="w-full shrink-0 overflow-hidden rounded-[10px] border light-card lg:w-[min(500px,36vw)] xl:w-[500px]">
          <DayDetailsCard weather={weather} type={type} setType={setType} location={location} setLocation={setLocation} />
        </div>
      </section>

      {/* Row 2 */}
      <section
        id="weather"
        className="flex min-h-0 flex-col gap-4 lg:h-1/2 lg:flex-row lg:overflow-hidden lg:gap-7"
      >
        {/* Left Column */}
        <div
          id="weather-left"
          className="min-h-[360px] flex-1 overflow-x-auto overflow-y-hidden rounded-[10px] border light-card lg:min-h-0"
        >
          <div className="flex h-full min-w-[640px] flex-col sm:min-w-[720px] lg:min-w-[800px] light-card">
            {/* Top Row */}
            <div className="min-h-0 flex-1 p-3 sm:p-4">
              <HourlyForecast location={location} />
            </div>

            {/* Bottom Row */}
            <div className="min-h-0 flex-1 p-3 pt-1 sm:p-4 sm:pt-1">
              <WeeklyForecast location={location} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          id="weather-right"
          className="w-full shrink-0 overflow-hidden rounded-[10px] border lightgray-gradient lg:w-[min(500px,36vw)] xl:w-[500px]"
        >
          <DetailedInfo loading={loading} weather={weather} />
        </div>
      </section>
    </div>
  );
}


{/*
  give me a layout for react app with tailwind css
  topmost div should occupy entire height and width and should not be scrollable (horizontally or vertically). it should have two rows
  first row: id = location. height 50% of availble height. should have two columns right column should be 500px, left column should occupy avaialbel width
  second row: id= weather height 50% of availble height. 
  should have two columns right column (id=weather-left) should be 500px, left column (id-weather-right)should occupy avaialbel width
      first column (id-weather-left) within second row should have two rows. horizontally scrollable.
  */}
