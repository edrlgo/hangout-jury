import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import ImgCanvas from '../components/img-canvas';
import { Autocomplete, Grid } from '@mui/material';
import countriesJson from '../countries.json';

const participantsAbbr = ['al','am','ee','fr','ge','de','ie','it','mt','nl','mk','pl','pt','es','ua','sm','cy'];

const HangoutJury = () => {
    const [votes, setVotes] = useState("");
    const [avg, setAvg] = useState("");
    const [stdev, setStdev] = useState("");
    const [color, setColor] = useState("#FFFFFF");

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("al");
    const [value, setValue] = useState("Albania");

    useEffect(() => {
        const countries = JSON.parse(JSON.stringify(countriesJson));
        // const participants = countries.filter(x => participantsAbbr.includes(x.code));
        // console.log(participants);

        setCountries(countries.map(c => {
            return {
                label: c.country,
                value: c.longCode,
                color: c.color
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
            setColor(newValue.color);
        }
    };

    return (
        <div>
            <h1>Hangout Jury Results</h1>
            <Grid container>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={2} sx={{ marginBottom: "8px" }}>
                    <Autocomplete
                        disablePortal
                        autoComplete={false}
                        options={countries}
                        isOptionEqualToValue={(option, value) => option.label === value}
                        sx={{ 
                            width: "80%",
                            marginLeft: { xs: "auto", md: 0 },
                            marginRight: { xs: "auto", md: 0 }
                        }}
                        renderInput={(params) => <TextField {...params} label="Country" />}
                        value={value}
                        onChange={(e, newValue) => onCountryChange(e, newValue)}
                    />
                </Grid>
                <Grid item xs={12} md={2} sx={{ marginBottom: "8px" }}>
                    <TextField label="Votes" variant="outlined" defaultValue={votes} onChange={e => setVotes(e.target.value)} sx={{ width: "80%" }} />
                </Grid>
                <Grid item xs={12} md={2} sx={{ marginBottom: "8px" }}>
                    <TextField label="Average" variant="outlined" defaultValue={avg} onChange={e => setAvg(e.target.value)} sx={{ width: "80%" }} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField label="St. dev" variant="outlined" defaultValue={stdev} onChange={e => setStdev(e.target.value)} sx={{ width: "80%" }} />
                </Grid>
                <Grid item md={2}></Grid>
            </Grid>

            <h2>Preview</h2>
            <ImgCanvas country={country} votes={votes} avg={avg} stdev={stdev} color={color} />
        </div>
    );
}

export default HangoutJury;