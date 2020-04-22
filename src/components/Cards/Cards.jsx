import React, {useState, useEffect} from 'react';
import {Card, CardContent, Typography, Grid, Box, StylesProvider} from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './Cards.module.css';
import cx from 'classnames';

const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate}, beforePastData: {beforePastDayConfirmed, beforePastDayRecovered, beforePastDayDeaths}, beforePastDay} ) => {
    let confirmedDifference = '';
    let recoveredDifference = '';
    let deathsDifference = '';
    if(!confirmed){
        return 'Loading...';
    } else {
        const calculateData = ()=>{
            if(beforePastDayConfirmed && ((new Date(beforePastDay).toDateString() !== new Date(lastUpdate).toDateString()))){
                confirmedDifference = (parseInt(beforePastDayConfirmed) - parseInt(confirmed.value)) >= 0 ? `${(parseInt(beforePastDayConfirmed) - parseInt(confirmed.value))} increased since ${new Date(beforePastDay).toDateString()}` : `${(parseInt(confirmed.value) - parseInt(beforePastDayConfirmed))} decreased since ${new Date(beforePastDay).toDateString()}`;
                recoveredDifference = (parseInt(beforePastDayRecovered) - parseInt(recovered.value)) >= 0 ? `${(parseInt(beforePastDayRecovered) - parseInt(recovered.value))} increased since ${new Date(beforePastDay).toDateString()}` : `${(parseInt(recovered.value) - parseInt(beforePastDayRecovered))} decreased since ${new Date(beforePastDay).toDateString()}`;
                deathsDifference = (parseInt(beforePastDayDeaths) - parseInt(deaths.value)) >= 0 ? `${(parseInt(beforePastDayDeaths) - parseInt(deaths.value))} increased since ${new Date(beforePastDay).toDateString()}` : `${(parseInt(deaths.value) - parseInt(beforePastDayDeaths))} decreased since ${new Date(beforePastDay).toDateString()}`;
            }
        }
        calculateData();
    }
    return (
        <div className={styles.container}>
            <Box p={5}>
                <Typography color="textSecondary" variant="h2" align="center" className={styles.date_heading}>{new Date(lastUpdate).toDateString()}</Typography>
                <Typography color="primary" variant="h5" className={styles.greeting} align="center">{confirmedDifference ? `Differences are based on days` : 'Wash your hands regularly'}</Typography>
            </Box>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp 
                                start={0}
                                end={confirmed.value}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography variant="subtitle1" color="error">{ confirmedDifference ? confirmedDifference : '' }</Typography>
                        <Typography variant="body2">Number of Active Cases of Covid-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp 
                                start={0}
                                end={recovered.value}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography variant="subtitle1" color="error">{ recoveredDifference ? recoveredDifference : '' }</Typography>
                        <Typography variant="body2">Number of People Recovered from Covid-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp 
                                start={0}
                                end={deaths.value}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography variant="subtitle1" color="error">{ deathsDifference ? deathsDifference : '' }</Typography>
                        <Typography variant="body2">Number of Deaths from Covid-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;