import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import ImgCanvas from '../components/img-canvas';
import { Autocomplete, Box, Grid } from '@mui/material';
import countriesJson from '../countries.json';

const HangoutJury = () => {
    const [votes, setVotes] = useState("");
    const [avg, setAvg] = useState("");
    const [stdev, setStdev] = useState("");

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("ALB");
    const [value, setValue] = useState("Germany");

    useEffect(() => {
        const countries = JSON.parse(JSON.stringify(countriesJson));

        setCountries(countries.map(c => {
            return {
                label: c.country,
                value: c.code
            }
        }));
    }, []);

    const onCountryChange = (e, newValue) => {
        console.log(newValue);
        setCountry(newValue.value);
        setValue(newValue.label);
    };

    return (
        <div>
            <h1>Hangout Jury Results</h1>
            <Grid container>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={2}>
                    <Autocomplete
                        disablePortal
                        options={countries}
                        isOptionEqualToValue={(option, value) => option.label === value}
                        sx={{ width: "80%" }}
                        renderInput={(params) => <TextField {...params} label="Country" />}
                        value={value}
                        onChange={(e, newValue) => onCountryChange(e, newValue)}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField label="Votes" variant="outlined" defaultValue={votes} onChange={e => setVotes(e.target.value)} sx={{ width: "80%" }} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField label="Average" variant="outlined" defaultValue={avg} onChange={e => setAvg(e.target.value)} sx={{ width: "80%" }} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField label="St. dev" variant="outlined" defaultValue={stdev} onChange={e => setStdev(e.target.value)} sx={{ width: "80%" }} />
                </Grid>
                <Grid item md={2}></Grid>
            </Grid>

            <h2>Preview</h2>
            <ImgCanvas country={country} votes={votes} avg={avg} stdev={stdev} />
        </div>
    );
}

export default HangoutJury;