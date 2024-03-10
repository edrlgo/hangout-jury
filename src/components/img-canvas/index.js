import React, { useEffect, useRef } from 'react';
import { Button, Box } from '@mui/material';
import './index.css';

const ImgCanvas = (props) => {
    const { country, votes, avg, stdev } = props;

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const img = new Image();

        try {
            img.src = require(`../../img/${country}.png`);
        }
        catch {
            img.src = require(`../../img/error.png`);
        }

        img.onload = function() {
            const textXPos = 800, textYPos = 675;
            const yellow = "#ffd02a", pink = "#ff43e2";

            ctx.drawImage(img, 0, 0);

            ctx.font = "48pt Avalon";
            ctx.textAlign = "center";
            
            ctx.fillText(votes, textXPos, textYPos);
            ctx.fillText(avg, textXPos + 182, textYPos);
            ctx.fillText(stdev, 1174, textYPos);

            const gradient = ctx.createLinearGradient(723, textYPos, 1280, textYPos);
            gradient.addColorStop("0", yellow);
            gradient.addColorStop("0.25", pink);
            gradient.addColorStop("0.5", yellow);
            gradient.addColorStop("0.75", pink);
            gradient.addColorStop("1", yellow);

            ctx.fillStyle = gradient;
        }

    }, [country, votes, avg, stdev]);

    const onDownloadClick = () => {
        const canvas = document.getElementById('hj-canvas');

        const img = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        const link = document.createElement("a");

        link.download = `hangout-jury-2024-${country}.png`;
        link.href = img;
        link.click();
    };

    return (
        <Box sx={{ mx: 2, fontFamily: 'Metropolis' }}>
            <canvas id="hj-canvas" ref={canvasRef} width="1280" height="720" />
            
            <Box sx={{ mb: 10 }}>
                <Button variant="contained" color="success" size="large" onClick={onDownloadClick}>
                    Download
                </Button>
            </Box>
        </Box>
    )
};

export default ImgCanvas;