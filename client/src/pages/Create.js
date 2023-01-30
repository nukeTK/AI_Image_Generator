import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import preview from "../asset/preview.png";

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [genratingImg, setGenratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseme = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const genratingImage = async () => {
    if (form.prompt) {
      try {
        setGenratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGenratingImg(false);
      }
    } else {
      alert("please provide the proper prompt");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...form}),
        });
        await response.json();
        navigate("/");
      } catch (error) {
        
        alert(error);
      } finally {
        setLoading(false);
      }
    } else alert("Enter the prompt and generate the image");
  };

  return (
    <Box
      sx={{
        width: { xs: "80%", md: "30%" },
        margin: { xs: "10px auto", md: "50px auto" },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="column">
          <Typography variant="h6" fontFamily="cursive">
            Create your own AI
          </Typography>
          <TextField
            label="Your Name"
            name="name"
            placeholder="Ex, john dee"
            value={form.name}
            onChange={handleChange}
            size="small"
            required
          />
          <TextField
            label="Your Prompt"
            name="prompt"
            placeholder="Ex, an armchair in the shape of an avocado"
            value={form.prompt}
            onChange={handleChange}
            size="small"
            required
          />
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Button
              size="small"
              variant="contained"
              sx={{
                justifyContent: "start",
                width: "35%",
                display: "inline-block",
              }}
              onClick={() => handleSurpriseme()}
            >
              Surprise ME
            </Button>
            <Typography variant="caption">
              Click Here For Random Prompt
            </Typography>
          </Stack>
          <Paper
            sx={{
              width: "200px",
              height: "200px",
              position: "relative",
              borderRadius: "20px",
            }}
          >
            {form.photo ? (
              <Box
                component="img"
                src={form.photo}
                alt={form.prompt}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <Box
                component="img"
                src={preview}
                alt="preview"
                sx={{ objectFit: "cover", width: "100%" }}
              />
            )}
            {loading && (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    bgcolor: "grey",
                    width: "200px",
                    height: "200px",
                    left: "0%",
                    top: "0%",
                    opacity: "0.7",
                    borderRadius: "20px",
                  }}
                />
                <CircularProgress
                  sx={{ position: "absolute", left: "40%", top: "40%" }}
                />
              </>
            )}
          </Paper>
          <Button
            variant="contained"
            color="success"
            onClick={() => genratingImage()}
          >
            {genratingImg ? "Genrating...." : "Generate AI Image"}
          </Button>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="caption" sx={{ marginTop: "10px" }}>
            ** Once you have created the image you want, you can share it with
            others in the community **
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{ bgcolor: "#8253D1 " }}
          >
            Share with community
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Create;
