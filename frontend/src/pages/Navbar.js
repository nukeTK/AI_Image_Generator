import React from "react";
import { AppBar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";
import logo from "../asset/openai.png";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        width: "80%",
        mx: "auto",
        bgcolor: "white",
        left: "0%",
        right: "0%",
        p: "0.5",
        borderRadius: "10px",
        height: "40px",
      }}
    >
      <Stack
        direction="row"
        sx={{
          padding: "1px",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box
          component="img"
          sx={{ height: "35px", width: "35px", p:"2px" }}
          src={logo}
          alt="logo"
        />
        <Typography variant="h6" sx={{ color: "black", flex: "0.98" }}>
          OpenAI
        </Typography>
        <Typography
          variant="h6"
          sx={{
            width: "5%",
          }}
        >
          <Link
            to="/create"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            Create
          </Link>
        </Typography>
      </Stack>
    </AppBar>
  );
};

export default Navbar;
