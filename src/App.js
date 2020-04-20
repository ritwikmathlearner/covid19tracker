import React from 'react';

import {Cards, Chart, CountryPicker} from './components';
import {Typography, Box, Link} from '@material-ui/core';
import styles from './App.module.css';
import {fetchData, fetchLocalData} from './api';
import {fetchDailyData} from './api';

class App extends React.Component {
    state = {
        beforePastData: {},
        data: {},
        country: '',
        beforePastDay: ''
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
        const fetchedBeforePastData = await fetchLocalData();
        this.setState({beforePastData: fetchedBeforePastData});
        const fetchedBeforePastDay = localStorage.getItem(`covid_status_before_past_day`);
        this.setState({beforePastDay: fetchedBeforePastDay});
    }

    handleCountryChange = async (country)=>{
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
        const fetchedBeforePastData = await fetchLocalData(country);
        this.setState({beforePastData: fetchedBeforePastData});
        const fetchedBeforePastDay = localStorage.getItem(`covid_status_before_past_day`);
        this.setState({beforePastDay: fetchedBeforePastDay});
    }

    showContent = async ()=> {
        
    }

    render() {
        const {beforePastData, data, country, beforePastDay} = this.state;
        return (
            <div className={styles.container}>
                <Cards data={data} beforePastData={beforePastData} beforePastDay={beforePastDay} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
                <Box p={5}>
                    <Typography color="textSecondary" variant="body2" align="center">&copy; Developed and Maintained by Ritwik Math (Version: 1.2.0)</Typography>
                    <Typography color="textSecondary" variant="body2" align="center">
                        <Link href="https://github.com/ritwikmathlearner/covid19tracker/" target="_blank">Github Repo</Link></Typography>
                </Box>
            </div>
        )
    }
}

export default App;
