import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { faCartShopping, faHeart, faGrip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TheCard from '../components/TheCard';
import {db} from "../config/firebase";
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, where, query } from "firebase/firestore/lite";
import TheCardClose from '../components/TheCardClose';
import CircularProgress from '@mui/material/CircularProgress';
import { useUser } from "../userContext";
import { useUsername } from "../usernameContext";
import TheCardFriends from '../components/TheCardFriends';

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

export default function CenteredTabs({followerid, followerUsername}) {
  const { user } = useUser();
  const { username } = useUsername();
  const userId = user.value; // Specify the user ID
  const userName = username.value2; // Specify the user ID

  const [listCount, setCount] = useState([]); 

  const [value, setValue] = React.useState(1);
  const [closeFriends, setFriends] = useState([]); 
  const [closeFriendList, setFriendList] = useState([]); 


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoading1, setLoading1] = useState(true);

  

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
                .map( (doc) => {
                  let prods = [];
                  getDocs(collection(db, "wishlists/" + doc.id + "/products"))
                    .then((q)=>{               
                        prods = q.docs
                        .map((d) => {
                          prods.push(d.data());                      
                        });
                      })
                  wishlist.push([doc.data(), prods, doc.id]);     
                  listCount.push(['count']); 
                  console.log(doc.data());        
                  })
              });
              //setWishlist(categories);  
              console.log(categories);
              
   }
   

   const fetchFriends = async () => {
    const followersCollection = collection(db, 'followers');
    const q1 = query(followersCollection, where('followerid', '==', userId), where('closeFriend', '==', true), where('userid', '==', followerid));

    await getDocs(q1)
    .then((querySnapshot)=>{    
        const list = querySnapshot.docs
            .map((doc) => {
              doc.data()
              closeFriends.push(doc.data().userid)
              console.log(doc.data().userid);
            })

            let wlist = [];
            let flist = [];
            console.log(wishlist)
            wishlist.forEach(element => {
              console.log(element);
  
              if(element[0].userid == followerid && element[0].visible == "Public"){
                wlist.push(element);
                console.log(wlist);
                setWishlist(wlist);
                
  
              }
              else if(element[0].visible != "Private"){
                closeFriends.forEach(e => {
                  if(e == element[0].userid){
                    flist.push(element);
                    closeFriendList.push(element);
                    console.log(e);
                    console.log(element[0].userid);
                    console.log(closeFriendList);
                    setLoading1(false);
                  }
                });
              }
            })
            // wishlist.length = 0;
            // wishlist.push(wlist);
            console.log(wishlist.length);
            console.log(listCount);
            console.log(wlist);
            if(wlist.length >= listCount.length || wlist.length == 0){
              setWishlist([]);
            }
            console.log(wishlist);
            setTimeout(()=> {
              setLoading(false);
            },5000);
            console.log(closeFriends);
          
          
          });
          

}
function filterUser(){
  let wlist = [];
  wishlist.forEach(element => {
    console.log(element);

    if(element[0].userid == userId){
      wlist.push(element);
      console.log(wlist);
      setWishlist(wlist);
      

    }
  })
  setTimeout(()=> {
    setLoading(false);
  },5000);              
}

  useEffect(() => {
    if(followerid){
      fetchPost().then(()=> fetchFriends());
    }
    else{
      fetchPost().then(() => filterUser());
    }
    ;
  }
  , []); // Include 'wishlist' in the dependency array fetchPost().then(()=> fetchFriends());
  if(!followerid){
    if (!isLoading && !isLoading1) {

      return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label={<FontAwesomeIcon icon={faGrip} className='icon'/>} />
            <Tab label={<FontAwesomeIcon icon={faCartShopping} className='icon'/>} />
            <Tab label={<FontAwesomeIcon icon={faHeart} className='icon'/>} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <div style={{height: '500px'}}>Nothing yet</div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
              <TheCard parentToChild={wishlist}/>
              <h3>Close Friends</h3>
              <TheCardClose parentToChild={closeFriendList}/>
              
    
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div style={{height: '500px'}}>Nothing yet</div>
          </CustomTabPanel>
        </Box>
      );
      }
      else if(!isLoading){
        return (
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label={<FontAwesomeIcon icon={faGrip} className='icon'/>} />
              <Tab label={<FontAwesomeIcon icon={faCartShopping} className='icon'/>} />
              <Tab label={<FontAwesomeIcon icon={faHeart} className='icon'/>} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <div style={{height: '500px'}}>Nothing yet</div>
            </CustomTabPanel>
            <CustomTabPanel value={value} style={{minHeight: '500px'}} index={1}>
                <TheCard parentToChild={wishlist}/>
      
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div style={{height: '500px'}}>Nothing yet</div>
            </CustomTabPanel>
          </Box>
        );
      }
      else {
        return (
          <div style={{ textAlign: 'center', height:"500px" }}>
            <CircularProgress size={24} sx={{ color: 'red', mx: 'auto', my: 2 }} />
          </div>
        )
      }
  }
  else {
    if (!isLoading && !isLoading1 && wishlist != []) {

      return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label={<FontAwesomeIcon icon={faGrip} className='icon'/>} />
            <Tab label={<FontAwesomeIcon icon={faCartShopping} className='icon'/>} />
            <Tab label={<FontAwesomeIcon icon={faHeart} className='icon'/>} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <div style={{height: '500px'}}>Nothing yet</div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
              <TheCardFriends parentToChild={wishlist}/>
              <h3>Close Friends</h3>
              <TheCardClose parentToChild={closeFriendList}/>
              
    
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div style={{height: '500px'}}>Nothing yet</div>
          </CustomTabPanel>
        </Box>
      );
      }
      else if(!isLoading && wishlist != []){
        return (
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label={<FontAwesomeIcon icon={faGrip} className='icon'/>} />
              <Tab label={<FontAwesomeIcon icon={faCartShopping} className='icon'/>} />
              <Tab label={<FontAwesomeIcon icon={faHeart} className='icon'/>} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <div style={{height: '500px'}}>Nothing yet</div>
            </CustomTabPanel>
            <CustomTabPanel value={value} style={{minHeight: '500px'}} index={1}>
                <TheCardFriends parentToChild={wishlist}/>
      
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div style={{height: '500px'}}>Nothing yet</div>
            </CustomTabPanel>
          </Box>
        );
      }
      else if(!isLoading && !isLoading1 && wishlist == []){
        return (
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label={<FontAwesomeIcon icon={faGrip} className='icon'/>} />
              <Tab label={<FontAwesomeIcon icon={faCartShopping} className='icon'/>} />
              <Tab label={<FontAwesomeIcon icon={faHeart} className='icon'/>} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <div style={{height: '500px'}}>Nothing yet</div>
            </CustomTabPanel>
            <CustomTabPanel value={value} style={{minHeight: '500px'}} index={1}>
              <div style={{height: '500px'}}>Nothing yet</div>
      
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div style={{height: '500px'}}>Nothing yet</div>
            </CustomTabPanel>
          </Box>
        );
      }
      else {
        return (
          <div style={{ textAlign: 'center', height:"500px" }}>
            <CircularProgress size={24} sx={{ color: 'red', mx: 'auto', my: 2 }} />
          </div>
        )
      }
  }
  
}