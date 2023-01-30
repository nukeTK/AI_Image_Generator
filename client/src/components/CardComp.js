import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import download from "../asset/download.png";
import { downloadImage } from "../utils";

const CardComp = ({ _id, name, prompt, photo }) => {
  return (
    <Grid rowGap={1}>
      <div className="container">
        <Box
          component="img"
          alt="AI"
          src={photo}
          sx={{
            position: "relative",
            width: "100%",
            borderRadius: "20px",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        <div className="overlay">
          <h4 className="title">
            {name} <br />
            {prompt.slice(0, 50) + "...."}
          </h4>
          <button className="button" onClick={() => downloadImage(_id, photo)}>
            <img src={download} alt="download" className="icon" />
          </button>
        </div>
      </div>
    </Grid>
  );
};

export default CardComp;
