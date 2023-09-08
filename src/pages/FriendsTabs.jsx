import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { faCartShopping, faHeart, faGrip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TheCard from '../components/CloseFriendlist';
import { db } from "../config/firebase";
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import getUsersData from "./getUsersData"; // Adjust the import path as needed
import CircularProgress from '@mui/material/CircularProgress';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function CenteredTabs() {
  const userId = "1";
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [closeFriendslist, setCloseFriendslist] = useState([]);
  const [isLoading, setLoading] = useState(true);
  var closeFriendsID = [];

  const fetchPost = async () => {
    try {
      const wishlistsCollection = collection(db, 'followers');
      const q = query(wishlistsCollection, where('userid', '==', userId), where('closeFriend', '==', true));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
        var data = doc.data()
        closeFriendsID.push(data.followerid);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    let userDataArray;

    fetchPost()
      .then((data) => {
        console.log(closeFriendsID);
        return getUsersData(closeFriendsID, db);
      })
      .then((data) => {
        userDataArray = data;
        if (userDataArray !== null) {
          console.log("User data for close friends:", userDataArray);
          setCloseFriendslist(userDataArray);
          setLoading(false);
          // Do something with the user data
        } else {
          // Handle the case where data retrieval failed
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any other errors that might occur during data retrieval
      });

  }, []); // Include 'wishlist' in the dependency array

  // Now userDataArray is accessible outside the promise chain


  if (!isLoading) {
    console.log(closeFriendslist);
    return (
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={'Following'} />
          <Tab label={'Followers'} />
          <Tab label={'Friends'} />
          <Tab label={'Close Friends'} />
          <Tab label={'Suggested'} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          Nothing yet
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Followers list here
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Friends list here
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <TheCard parentToChild={closeFriendslist} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Nothing yet
        </CustomTabPanel>
      </Box>
    );
  }
  else {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size={24} sx={{ color: 'red', mx: 'auto', my: 2 }} />
      </div>
    )
  }
}