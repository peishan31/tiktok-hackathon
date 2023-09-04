import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import item1 from '../images/item1.png';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'Left',
  color: theme.palette.text.primary,
  boxShadow: 'none'

}));

export default function Wishlists({parentToChild}) {

  // return (
  //   <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
  //       <List style={{flexDirection: 'column'}}>
  //         {parentToChild.map((item, i) => {
  //           return 

  //           <div key={i}>
  //             <ListItem disablePadding style={{paddingLeft:'0', paddingRight: '0'}}>
  //               <ListItemButton>
  //                 <img src={item1} style={{width: '100px', height: '100px', display: 'block'}}></img>
  //                 <br/>
  //                 <ListItemText primary={item[0].name} style={{display: 'block'}}/>

  //               </ListItemButton>
  //             </ListItem>
  //             <Divider />
  //           </div>


  //         }

  //         )}
  //       </List>
  //   </Box>
    
  // );

  return(
    <Box sx={{ flexGrow: 1 }}>
     {parentToChild.map((item, i) => { 
     return <div key={i} style={{marginBottom: '10px', display: 'block', borderBottom: 'rgb(183, 183, 183) solid 1px', borderTop: 'rgb(183, 183, 183) solid 1px'}}>
        <Grid container spacing={2} >
            <Grid item xs={6} md={4} style={{boxShadow: 0}}>
              <Item><img src={item1} style={{width: '100px', height: '100px', display: 'block'}}></img></Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item><img src={item1} style={{width: '100px', height: '100px', display: 'block'}}></img></Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item><img src={item1} style={{width: '100px', height: '100px', display: 'block'}}></img></Item>
            </Grid>
          </Grid>   
          <Grid container spacing={2}>   
            <Grid item xs={6} md={8}>
              <Item>{item[0].name}</Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>{item[0].numOfProds} items</Item>
            </Grid>
          </Grid>   
      </div>
     })}
  </Box>
  )
}
