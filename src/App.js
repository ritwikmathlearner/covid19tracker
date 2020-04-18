import React from 'react';

import {Cards, Chart, CountryPicker} from './components';
import {Typography, Box} from '@material-ui/core';
import styles from './App.module.css';
import {fetchData} from './api';
import {fetchDailyData} from './api';

class App extends React.Component {
    state = {
        data: {},
        country: '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country)=>{
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
    }

    render() {
        const {data, country} = this.state;
        return (
            <div className={styles.container}>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
                <Box p={5}>
                    <Typography color="textSecondary" variant="body2" align="center">&copy; Developed and Maintained by Ritwik Math</Typography>
                </Box>
            </div>
        )
    }
}

export default App;