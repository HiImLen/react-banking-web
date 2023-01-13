import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DownArrow from '../assets/icon/DownArrow.svg'
import notification from '../assets/icon/notification.svg'
import avt from '../assets/img/avt.svg'
import signout from '../assets/img/signout.svg'

export default function NavBar () {
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorEl2, setAnchorEl2] = useState(null)
  const open = Boolean(anchorEl)
  const open2 = Boolean(anchorEl2)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget)
  }
  const nagivate = useNavigate()
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('role_id')
    nagivate('/login')
    handleClose()
  }

  return (
      <div className="flex flex-row justify-between items-center">
        <Typography className='text-black' style={{ fontWeight: 600 }}>Home</Typography>
        {/* user menu */}
        <div className='flex flex-row justify-center items-center space-x-1'>
          <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick2}
          >
            <img className='mr-5' src={notification} alt='notification'/>

          </Button>
          <img src={avt} alt='avatar'/>
          <Typography className='text-black' style={{ fontWeight: 600 }}>DO TIEN TRUNG</Typography>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
              <img src={DownArrow} alt='DownArrow'/>
          </Button>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem className='flex flex-row justify-center space-x-1' onClick={handleLogout}>
            <img src={signout} alt='signout'/>
            <Typography style={{ fontWeight: 600 }}>Sign out</Typography>
          </MenuItem>
        </Menu>
        <Menu
          id="basic-menu2"
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem className='flex flex-row justify-center space-x-1' >
            <Typography style={{ fontWeight: 600 }}>Something...</Typography>
          </MenuItem>
        </Menu>
      </div>
  )
}
