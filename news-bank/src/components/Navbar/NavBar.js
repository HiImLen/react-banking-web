import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DownArrow from '../../assets/icon/DownArrow.svg'
import notification from '../../assets/icon/notification.svg'
import avt from '../../assets/img/avt.svg'
import signout from '../../assets/img/signout.svg'
import { clearLoginInfo } from '../../slice/loginSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function NavBar () {
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorEl2, setAnchorEl2] = useState(null)
  const open = Boolean(anchorEl)
  const open2 = Boolean(anchorEl2)
  const name = useSelector((state) => state.login.name)
  const dispatch = useDispatch()
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
    dispatch(clearLoginInfo())
    nagivate('/login')
    handleClose()
  }

  return (
      
  )
}
