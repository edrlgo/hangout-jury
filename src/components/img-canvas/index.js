import React, { useEffect, useRef } from 'react';
import { Button, Box, capitalize } from '@mui/material';
import './index.css';

const canvasMarkupText = (ctx, str, x, y, styles) => {
    const content = (start, end, rule) => ({ start, end, rule});
    const render = content => {
        Object.assign(ctx, styles[content.rule] ? styles[content.rule] : {});
        const s = str.slice(content.start, content.end);
        ctx.fillText(s, x, y);
        x += ctx.measureText(s).width;
    };

    const stack = [], xx = x;
    let pos = 0, current = content(pos, pos, "default");
    stack.push(current);
    while (pos < str.length) {
        const c = str[pos++];
        if (c === "<") {
            if (str[pos] === "/") {
                render(stack.pop());
                current = stack[stack.length - 1];
                current.start = current.end = (pos += 3);
            }
            else {
                render(current);
                pos += 2;
                stack.push(current = content(pos, pos, str[pos - 2]));
            }
        }
        else {
            current.end = pos;
        }
    }
    stack.length && render(current);
    return x - xx;
};

const ImgCanvas = (props) => {
    const { country, votes, avg, stdev, color } = props;

    const canvasRef = useRef(null);

    const styles = {
        default: { font: "32pt AktivGroteskRegular" },
        b: { font: "32pt AktivGroteskBold" }
    };

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
            const textXPos = 52, textYPos = 674;

            ctx.drawImage(img, 0, 0);

            // ctx.font = fontRegular;
            ctx.letterSpacing = "0.1px";
            ctx.textAlign = "left";
            ctx.fillStyle = color.length ? '#' + color : "#FFFFFF";
            const resultsString = country === "APRIL" ? 'Shrek is <b>love</b>, Shrek is <b>life</b>. Salame.' :
                `Votes: <b>${votes}</b> | Average: <b>${avg}</b> | Std.Dev.: <b>${stdev}</b>`;

            canvasMarkupText(ctx, resultsString, textXPos, textYPos, styles);

            // const gradient = ctx.createLinearGradient(723, textYPos, 1280, textYPos);
            // gradient.addColorStop("0", yellow);
            // gradient.addColorStop("0.25", pink);
            // gradient.addColorStop("0.5", yellow);
            // gradient.addColorStop("0.75", pink);
            // gradient.addColorStop("1", yellow);

            // ctx.fillStyle = gradient;
        }

    }, [country, votes, avg, stdev, color]);

    const onDownloadClick = () => {
        const canvas = document.getElementById('hj-canvas');

        const img = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        const link = document.createElement("a");

        link.download = `hangout-jury-2025-${country}.png`;
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