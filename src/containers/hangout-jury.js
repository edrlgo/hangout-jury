import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import ImgCanvas from '../components/img-canvas';
import { Autocomplete, Grid } from '@mui/material';
import countriesJson from '../countries.json';

const participants = ['al,am,ee,fr,ge,de,ie,it,mt,nl,mk,pl,pt,es,ua,gb'];

const HangoutJury = () => {
    const [votes, setVotes] = useState("");
    const [avg, setAvg] = useState("");
    const [stdev, setStdev] = useState("");

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("al");
    const [value, setValue] = useState("Albania");

    useEffect(() => {
        const countries = JSON.parse(JSON.stringify(countriesJson));
        console.log(countries);

        setCountries(countries.map(c => {
            return {
                label: c.country,
                value: c.code
            }
        }));

        // fetch(`https://restcountries.com/v3.1/alpha?codes=${participants}`)
        //     .then(res => res.json())
        //     .then(response => {
        //         console.log(response);

        //         let countries = response.map(c => {
        //             return {
        //                 label: c.name.common,
        //                 value: c.cca2.toLowerCase()
        //             }
        //         }).sort((a, b) => a.label.localeCompare(b.label));
        //         console.log(countries);

        //         setCountries(countries);
        //         setCountry(countries[0].value);
        //         setValue(countries[0].label);
        //     });
    }, []);

    const onCountryChange = (e, newValue) => {
        if (newValue !== null) {
            setCountry(newValue.value);
            setValue(newValue.label);
        }
    };

    return (
        <div>
            <h1>Hangout Jury Results</h1>
            <Grid container>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={2}>
                    <Autocomplete
                        disablePortal
                        autoComplete={false}
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