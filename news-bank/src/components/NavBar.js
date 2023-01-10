import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avt from '../assets/img/avt.svg';
import Signout from '../assets/img/Signout.svg';


export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const nagivate = useNavigate();
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        nagivate('/login');
        handleClose();
    }
  
    return (
      <div className="flex flex-row justify-between items-center">
        <Typography className='text-black' style={{fontWeight:600}}>Home</Typography>
        {/* user menu */}
        <Button
          id="basic-button"
          className='flex flex-row justify-center space-x-1'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
            <img src={avt} alt='avatar'/>
            <Typography className='text-black' style={{fontWeight:600}}>DO TIEN TRUNG</Typography>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem className='flex flex-row justify-center space-x-1' onClick={handleLogout}>
            <img src={Signout} alt='Signout'/>
            <Typography style={{fontWeight:600}}>Sign out</Typography>
          </MenuItem>
        </Menu>
      </div>
    );
}