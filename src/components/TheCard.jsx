import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import item1 from '../images/item1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TheCard() {
  return (
    <Card sx={{ width: 1/2 }} style={{display: 'inline-block', marginRight: '15px', marginLeft: '15px'}}>
      <CardContent sx={{ mb: -1 }}>
        <img src={item1} style={{height: "150px"}}></img>
        <Typography sx={{ fontSize: 16 }} color="text.primary">
          Outing Fits
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          5 items
          <FontAwesomeIcon style={{float: "right", fontSize: "18px"}} icon={faShareNodes} className='icon'/>
        </Typography>
      </CardContent>
    </Card>
  );
}