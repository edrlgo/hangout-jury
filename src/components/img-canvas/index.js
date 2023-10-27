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
            const textXPos = 1050;

            ctx.drawImage(img, 0, 0);

            ctx.font = "60pt Bazinga";
            ctx.fillStyle = "#fff";
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 10;
            ctx.textAlign = "left";
            
            ctx.strokeText(votes, textXPos, 490);
            ctx.fillText(votes, textXPos, 490);
            ctx.strokeText(avg, textXPos, 580);
            ctx.fillText(avg, textXPos, 580);
            ctx.strokeText(stdev, textXPos, 670);
            ctx.fillText(stdev, textXPos, 670);
        }

    }, [country, votes, avg, stdev]);

    const onDownloadClick = () => {
        const canvas = document.getElementById('hj-canvas');

        const img = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        const link = document.createElement("a");

        link.download = `hangout-jury-j2023-${country}.png`;
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