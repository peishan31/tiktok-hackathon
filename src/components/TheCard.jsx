import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import item1 from '../images/item1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Popup2 from '../pages/Popup2';
import { Link } from 'react-router-dom';
// import {
//   EmailShareButton,
//   FacebookShareButton,
//   HatenaShareButton,
//   InstapaperShareButton,
//   LineShareButton,
//   LinkedinShareButton,
//   LivejournalShareButton,
//   MailruShareButton,
//   OKShareButton,
//   PinterestShareButton,
//   PocketShareButton,
//   RedditShareButton,
//   TelegramShareButton,
//   TelegramIcon,
//   TumblrShareButton,
//   TwitterShareButton,
//   TwitterIcon,
//   ViberShareButton,
//   VKShareButton,
//   WhatsappShareButton,
//   WorkplaceShareButton
// } from "react-share";
import PopupMessage from '../pages/PopupMessage';
import { useHistory } from "react-router-dom";


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TheCard({ parentToChild }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [itemDetail, setItem] = useState(parentToChild[0]);
  const [copied, setCopy] = useState('');
  const [copy, setCopies] = useState('');
  const history = useHistory();

  function handleOpenPopup(item) {
    setItem(item);
    setIsPopupOpen(true);
  };

  const handleClosePopup = (isOk, option) => {
    setIsPopupOpen(false);
    if (isOk) {
      setSelectedOption(option);
      // Handle your OK button logic here
      setTimeout(()=> {
        history.push('/profile/1');
        setTimeout(()=> {
          history.push('/profile');
        },500);
      },1);

    }
  };

  const linkStyle = {
    textDecoration: 'none', // Remove the underline
    color: 'blue', // You can also specify the link color
  };

  function popupMsg(item) {
    navigator.clipboard.writeText('https://tiktok-e9a35.web.app/seeWishlistBoard'+'/'+ item[0].name + '/' + item[0].userid); 
    setCopy("Copied link!" + copy); 
    setCopies(' ' + copy);
  }
  

  return (
    <div>
      {parentToChild.map((item, i) => {
        return <div key={i} style={{ display: 'inline-block', marginLeft: '15px', marginRight: '15px', width: '40%' }}>
          <Card sx={{ width: 1 }} style={{ display: 'inline-block', position: 'relative' }}>
            <button onClick={() => handleOpenPopup(item)} style={{ position: 'absolute', right: '0', marginRight: '2px', marginTop: '5px', border: '0', backgroundColor: 'transparent' }}><FontAwesomeIcon icon={faEllipsisVertical} className='icon' style={{ float: "right", fontSize: "18px" }} /></button>

            <CardContent sx={{ mb: -1 }} >
              <Link to={`/seeWishlistBoard/${item[0].name}/${item[0].userid}`} style={linkStyle}>
                <img src={item[1][0].img} style={{ height: "120px", width: "100%" }}></img>

                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  {item[0].name}
                </Typography>
              </Link>
              <Typography sx={{ fontSize: 12 }} color="text.secondary">
                {item[0].numOfProds} items

                {/* <TwitterShareButton
                  url={'http://localhost:3000/profile'+'/'+ item[0].name + '/' + item[0].userid}
                  title={item[0].name}
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton> */}
                        <PopupMessage message={copied} />

                <FontAwesomeIcon style={{ float: "right", fontSize: "18px" }} onClick={() => popupMsg(item)} icon={faShareNodes} className='icon' />
              </Typography>
            </CardContent>
          </Card>
        </div>
      }
      )}
      <Popup2 itemDetails={itemDetail} style={{ width: '20%' }} isOpen={isPopupOpen} onClose={handleClosePopup} />

    </div>

  );
}