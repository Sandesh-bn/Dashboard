import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from "@/components/ui/button"
import { LocationDropDown } from './components/LocationDropDown'
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
      <div className="h-screen w-screen overflow-hidden flex flex-col p-5 gap-5 light-background">
      {/* Row 1 */}
      <section
        id="location"
        className="h-1/2 min-h-0 flex overflow-hidden gap-7"
      >
        {/* Left Column */}
        <div className="flex-1  overflow-hidden light-card">
            <CityMap location={location} type={type} />
        </div>

        {/* Right Column */}
        <div className="w-[500px] shrink-0 border rounded-[10px]  overflow-hidden  light-card">
            <DayDetailsCard weather={weather} type={type} setType={setType} location={location} setLocation={setLocation} />
        </div>
      </section>

      {/* Row 2 */}
      <section
        id="weather"
        className="h-1/2 min-h-0 flex overflow-hidden gap-7"
      >
        {/* Left Column */}
        <div
          id="weather-left"
          className="flex-1 shrink-0 border rounded-[10px] overflow-x-auto overflow-y-hidden  light-card"
        >
          <div className="flex flex-col min-w-[800px] h-full  light-card">
            {/* Top Row */}
            <div className="flex-1  p-4">
              <HourlyForecast location={location}/>
            </div>

            {/* Bottom Row */}
            <div className="flex-1 p-4">
              <WeeklyForecast location={location}/>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          id="weather-right"
          className="w-[500px] border rounded-[10px] overflow-hidden  light-card"
        >
         <DetailedInfo loading={loading} weather={weather}/>
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
