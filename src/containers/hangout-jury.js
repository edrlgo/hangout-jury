import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ImgCanvas from '../components/img-canvas';
import { Grid } from '@mui/material';

const HangoutJury = () => {
    const [votes, setVotes] = useState("");
    const [avg, setAvg] = useState("");
    const [stdev, setStdev] = useState("");

    const [country, setCountry] = useState("EST");

    return (
        <div>
            <h1>Hangout Jury Results</h1>
            <Grid container>
                <Grid item md={3}></Grid>
                <Grid item xs={12} md={2}>
                    <TextField label="Votes" variant="outlined" defaultValue={votes} onChange={e => setVotes(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField label="Average" variant="outlined" defaultValue={avg} onChange={e => setAvg(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField label="St. dev" variant="outlined" defaultValue={stdev} onChange={e => setStdev(e.target.value)} />
                </Grid>
                <Grid item md={3}></Grid>
            </Grid>

            <h2>Preview</h2>
            <ImgCanvas country={country} votes={votes} avg={avg} stdev={stdev} />
        </div>
    );
}

export default HangoutJury;