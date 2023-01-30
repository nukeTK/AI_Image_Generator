import { Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material'
import React from 'react'

const CardComp = ({post}) => {
  return (
    <Grid post sx={{marginLeft:"5px"}}>
    <Card
      elevation={3}
      sx={{ width: 380, height: 500, borderRadius: "20px" }}
    >
      <CardMedia
        component="img"
        alt="AI"
        height="300"
        image={post.photo}
        sx={{
          objectFit: "cover",
          objectPosition: "top",
          transition: "0.4s ease",
          borderStartStartRadius: "20px",
          "&:hover": {
            transform: "scale(1.10)",
            cursor: "pointer",
          },
        }}
      />
      <Divider />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.name}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  )
}

export default CardComp