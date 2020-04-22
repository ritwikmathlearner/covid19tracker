import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) =>{
    let changeableURL = url;

    if(country) {
        changeableURL = `${url}/countries/${country}`;
        // localStorage.setItem(`covid_status_${country}`, country);
    }

    try {
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableURL);
        let pastDay = localStorage.getItem(`covid_status_past_day`) ? localStorage.getItem(`covid_status_past_day`) : null;
        let countryStatus = localStorage.getItem(`covid_status_${country}_confirmed_past_day`) ? localStorage.getItem(`covid_status_${country}_confirmed_past_day`) : null;
        if(pastDay == null) {
            if(country){
                localStorage.setItem(`covid_status_${country}_confirmed_past_day`, confirmed.value);
                localStorage.setItem(`covid_status_${country}_recovered_past_day`, recovered.value);
                localStorage.setItem(`covid_status_${country}_deaths_past_day`, deaths.value);
                localStorage.setItem(`covid_status_${country}_confirmed_before_past_day`, confirmed.value);
                localStorage.setItem(`covid_status_${country}_recovered_before_past_day`, recovered.value);
                localStorage.setItem(`covid_status_${country}_deaths_before_past_day`, deaths.value);
            } else {
                localStorage.setItem(`covid_status_confirmed_past_day`, confirmed.value);
                localStorage.setItem(`covid_status_recovered_past_day`, recovered.value);
                localStorage.setItem(`covid_status_deaths_past_day`, deaths.value);
                localStorage.setItem(`covid_status_confirmed_before_past_day`, confirmed.value);
                localStorage.setItem(`covid_status_recovered_before_past_day`, recovered.value);
                localStorage.setItem(`covid_status_deaths_before_past_day`, deaths.value);
            }
            localStorage.setItem(`covid_status_past_day`, lastUpdate);
            localStorage.setItem(`covid_status_before_past_day`, lastUpdate);
        } else if((new Date(pastDay).toDateString() !== new Date(lastUpdate).toDateString())){
            if(country){
                if(countryStatus == null){
                    localStorage.setItem(`covid_status_${country}_confirmed_past_day`, confirmed.value);
                    localStorage.setItem(`covid_status_${country}_recovered_past_day`, recovered.value);
                    localStorage.setItem(`covid_status_${country}_deaths_past_day`, deaths.value);
                    localStorage.setItem(`covid_status_${country}_confirmed_before_past_day`, confirmed.value);
                    localStorage.setItem(`covid_status_${country}_recovered_before_past_day`, recovered.value);
                    localStorage.setItem(`covid_status_${country}_deaths_before_past_day`, deaths.value);
                } else {
                    let pastDayConfirmed = localStorage.getItem(`covid_status_${country}_confirmed_past_day`);
                    let pastDayRecovered = localStorage.getItem(`covid_status_${country}_recovered_past_day`);
                    let pastDayDeaths = localStorage.getItem(`covid_status_${country}_deaths_past_day`);
                    localStorage.setItem(`covid_status_${country}_confirmed_before_past_day`, pastDayConfirmed);
                    localStorage.setItem(`covid_status_${country}_recovered_before_past_day`, pastDayRecovered);
                    localStorage.setItem(`covid_status_${country}_deaths_before_past_day`, pastDayDeaths);
                    localStorage.setItem(`covid_status_${country}_confirmed_past_day`, confirmed.value);
                    localStorage.setItem(`covid_status_${country}_recovered_past_day`, recovered.value);
                    localStorage.setItem(`covid_status_${country}_deaths_past_day`, deaths.value);
                }
            } else {
                let pastDayConfirmed = localStorage.getItem(`covid_status_confirmed_past_day`);
                let pastDayRecovered = localStorage.getItem(`covid_status_recovered_past_day`);
                let pastDayDeaths = localStorage.getItem(`covid_status_deaths_past_day`);
                localStorage.setItem(`covid_status_confirmed_before_past_day`, pastDayConfirmed);
                localStorage.setItem(`covid_status_recovered_before_past_day`, pastDayRecovered);
                localStorage.setItem(`covid_status_deaths_before_past_day`, pastDayDeaths);
                localStorage.setItem(`covid_status_confirmed_past_day`, confirmed.value);
                localStorage.setItem(`covid_status_recovered_past_day`, recovered.value);
                localStorage.setItem(`covid_status_deaths_past_day`, deaths.value);
            }
            pastDay = localStorage.getItem(`covid_status_past_day`);
            localStorage.setItem(`covid_status_before_past_day`, pastDay);
            localStorage.setItem(`covid_status_past_day`, lastUpdate);
        }
        // console.log((new Date(pastDay).toDateString() !== new Date(lastUpdate).toDateString()), new Date(pastDay).toDateString(), new Date(lastUpdate).toDateString());
        return {confirmed, recovered, deaths, lastUpdate};
    } catch (error){
        console.log(error);
    }
}

export const fetchLocalData = async (country)=>{
    try {
        if(country){
            const {beforePastDayConfirmed, beforePastDayRecovered, beforePastDayDeaths} = {
                beforePastDayConfirmed: localStorage.getItem(`covid_status_${country}_confirmed_before_past_day`),
                beforePastDayRecovered: localStorage.getItem(`covid_status_${country}_recovered_before_past_day`),
                beforePastDayDeaths: localStorage.getItem(`covid_status_${country}_deaths_before_past_day`)
            }
            return {beforePastDayConfirmed, beforePastDayRecovered, beforePastDayDeaths};
        } else {
            const {beforePastDayConfirmed, beforePastDayRecovered, beforePastDayDeaths} = {
                beforePastDayConfirmed: localStorage.getItem('covid_status_confirmed_before_past_day'),
                beforePastDayRecovered: localStorage.getItem('covid_status_recovered_before_past_day'),
                beforePastDayDeaths: localStorage.getItem('covid_status_deaths_before_past_day')
            }
            return {beforePastDayConfirmed, beforePastDayRecovered, beforePastDayDeaths};
        }
    } catch(error){
        console.log(error);
    }
}

export const fetchDailyData = async ()=>{
    try {
        const { data } = await axios.get(`${url}/daily`);
        
        const modifiedData = data.map(dailyData => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))

        return modifiedData;
    } catch(error) {
        console.log(error);
    }
}

export const fetchCountries = async ()=>{
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map(country => country.name);
    } catch(error){
        console.log(error);
    }
}