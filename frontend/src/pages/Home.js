import {
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CardComp from "../components/CardComp";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allpost, setAllPost] = useState(null);
  const [searchText, setSearchText] = useState(null);

  const RenderCard = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post, index) => <CardComp key={index} {...post} />);
    }
    return (
      <Typography
        variant="body1"
        sx={{
          margin: "20px 8px",
          bgcolor: "#845EC2",
          borderRadius: "10px",
          p: "5px",
        }}
      >
        {title}
      </Typography>
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <Box sx={{ width: "80%", margin: "10px auto" }}>
      <Stack direction="column" spacing={1}>
        <Typography variant="h6">The Community Showcase</Typography>
        <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
          Browse through a collection of imaginative and visually stunning
          images generated by AI
        </Typography>
        <TextField
          id="outlined-basic"
          label="Search Something..."
          variant="outlined"
          sx={{ width: "20%" }}
          size="small"
          handleChange={handleSearchChange}
          value={searchText}
        />
      </Stack>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {searchText && <Typography variant="h6">{searchText}</Typography>}
          <Grid container direction="row" spacing={1}>
            {searchText ? (
              <RenderCard data={searchText} title="No search result found" />
            ) : (
              <RenderCard data={allpost} title="No Post Yet" />
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Home;
