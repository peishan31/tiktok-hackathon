import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { faCartShopping, faHeart, faGrip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TheCard from '../components/TheCard';

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function CenteredTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <TheCard />
        <TheCard />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Nothing yet
      </CustomTabPanel>
    </Box>
  );
}