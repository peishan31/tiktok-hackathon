import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { faCartShopping, faHeart, faGrip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TheCard from '../components/TheCard';
import db from "../config/firebase";
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, where, query } from "firebase/firestore/lite";
import TheCardClose from '../components/TheCardClose';

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
  const [value, setValue] = React.useState(1);
  const userId = '1'; // Specify the user ID
  const [closeFriends, setFriends] = useState([]); 
  const [closeFriendList, setFriendList] = useState([]); 


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setLoading] = useState(true);


  async function getWishlist() {
    const wishlistCollection = collection(db, "wishlist");
    const wishlistSnapshot = await getDocs(wishlistCollection);
    const getWishList = await wishlistSnapshot.docs.map((doc) => doc.data());
    setWishlist(getWishList);
  }

  const fetchPost = async () => {
        let categories = [];
        const wishlistsCollection = collection(db, 'wishlists');
        const q1 = query(wishlistsCollection);

        await getDocs(q1)
        .then((querySnapshot)=>{               
            const list = querySnapshot.docs
                .map((doc) => {
                  let prods = [];
                  getDocs(collection(db, "wishlists/" + doc.id + "/products"))
                    .then((q)=>{               
                        prods = q.docs
                        .map((d) => {
                          prods.push(d.data());                      
                        });
                      })
                  wishlist.push([doc.data(), prods, doc.id]);          
                  console.log(doc.data());        
                  })
              });
              setWishlist(categories);                
              console.log(categories);
              
   }

   const fetchFriends = async () => {
    const followersCollection = collection(db, 'followers');
    const q1 = query(followersCollection, where('followerid', '==', userId), where('closeFriend', '==', true));

    await getDocs(q1)
    .then((querySnapshot)=>{    
        const list = querySnapshot.docs
            .map((doc) => {
              doc.data()
              closeFriends.push(doc.data().userid)
              console.log(doc.data().userid);
            })

          });
          
          let wlist = [];
          let flist = [];
          console.log(wishlist)
          wishlist.forEach(element => {
            console.log(element);

            if(element[0].userid == userId){
              wlist.push(element);
              console.log(wlist);
              setWishlist(wlist);

            }
            else{
              closeFriends.forEach(e => {
                if(e == element[0].userid){
                  flist.push(element);
                  console.log(e);
                  console.log(element[0].userid);
                  console.log(closeFriends);
                  setFriendList(flist);
                }
              });
            }
          })
          setLoading(false);
          console.log(closeFriends);


}

  useEffect(() => {
    fetchPost().then(()=> fetchFriends());
    ;
  }
  , []); // Include 'wishlist' in the dependency array
  if (!isLoading) {

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label={<FontAwesomeIcon icon={faGrip} className='icon'/>} />
        <Tab label={<FontAwesomeIcon icon={faCartShopping} className='icon'/>} />
        <Tab label={<FontAwesomeIcon icon={faHeart} className='icon'/>} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        Nothing yet
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
          <TheCard parentToChild={wishlist}/>
          <h3>Close Friends</h3>
          <TheCardClose parentToChild={closeFriendList}/>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Nothing yet
      </CustomTabPanel>
    </Box>
  );
  }
}