import React from 'react'
import Navbar from './Navbar/NavBar'
import QuickUtilityUser from './QuickUtility/QuickUtilityUser'
import QuickUtilityAdmin from './QuickUtility/QuickUtilityAdmin'
import QuickUtilityEmployee from './QuickUtility/QuickUtilityEmployee'
import SideBarUser from './Sidebar/SideBarUser' 
import SideBarAdmin from './Sidebar/SideBarAdmin'
import SideBarEmployee from  './Sidebar/SideBarEmployee'
import { useSelector } from 'react-redux'

export default function Homepage ({ child }) {
    const role_id = useSelector((state) => state.login.role_id)
    const roleID = parseInt(role_id);
    return (
        <div className='h-screen grid grid-cols-5 gap-x-5' style={{ background: '#F8F9FD' }}>
            {roleID === 1 ? <SideBarAdmin /> : roleID === 2 ? <SideBarUser />: <SideBarEmployee/>}
            <div className='col-span-4 grid grid-rows-6 '>
                <Navbar/>
                <div className='row-span-5 grid grid-cols-7 gap-x-5 mx-3'>
                    <div className='col-span-5'>
                        {child}
                    </div>
                    <div className='col-span-2'>
                    {roleID === 1 ? <QuickUtilityAdmin/> : roleID === 2 ? <QuickUtilityUser/>: roleID === 3 ? <QuickUtilityEmployee/>:<></>} 
                    </div>
                </div>
            </div>
        </div>
    )
}