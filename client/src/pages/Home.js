import {
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CardComp from "../components/CardComp";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allpost, setAllPost] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const RenderCard = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <CardComp key={post._id} {...post} />);
    }
    return (
      <Typography
        variant="body1"
        sx={{
          margin: "20px 8px",
          bgcolor: "#C087D6",
          borderRadius: "10px",
          p: "5px",
        }}
      >
        {title}
      </Typography>
    );
  };
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setAllPost(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allpost.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
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
          sx={{ width: { xs: "80%", md: "20%" } }}
          size="small"
          onChange={handleSearchChange}
          value={searchText}
        />
      </Stack>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {" "}
          {searchText && (
            <>
              <Typography variant="body1">Showing Resuls for </Typography>
              <Typography variant="subtitle">{searchText}</Typography>:
            </>
          )}
          <Grid
            container
            direction="row"
            spacing={1}
            sx={{ marginTop: "10px" }}
          >
            {searchText ? (
              <RenderCard
                data={searchedResults}
                title="No search result found"
              />
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
