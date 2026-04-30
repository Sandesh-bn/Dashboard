import clearsky from './animated/day.svg';
import clouds from './animated/cloudy.svg';
import cloudyday from './animated/cloudy-day-2.svg';
import thunderstorm from './animated/thunder.svg';
import snowy from './animated/snowy-5.svg';
import heavysnow from './animated/snowy-6.svg';
import lightrain from './animated/rainy-5.svg';
import mediumrain from './animated/rainy-6.svg';
import heavyrain from './animated/rainy-7.svg';
import defaultIcon from './animated/weather.svg';

const imagemap = {
    "clear sky": clearsky,
    "few clouds": cloudyday,
    "scattered clouds": cloudyday,
    "broken clouds": clouds,
    "shower rain": heavyrain,
    "rain": mediumrain,
    "thunderstorm": thunderstorm,
    "snow": heavysnow,
    "mist": snowy,
    "light intensity shower rain": lightrain,
    "overcast clouds": mediumrain,
    "moderate rain": mediumrain,
    "light rain": lightrain,
    "default": clouds
};



export default imagemap;