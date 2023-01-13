import React from 'react'
import Navbar from './Navbar/Navbar/NavBarUser'
import QuickUtilityUser from './QuickUtility/QuickUtilityUserUser'
import QuickUtilityUser from './QuickUtility/QuickUtilityUser'
import QuickUtilityEmployeeEmployee from './QuickUtility/QuickUtilityEmployee/QuickUtilityEmployee'
import SideBarUser from './SideBarUser from './Sidebar/SideBarUser'
import SideBarAdmin/SideBarUser'
import SideBarAdmin from './Sidebar/SideBarAdmin'
import SideBarEmployee from  './Sidebar/Sidebar/SideBarAdmin'
import SideBarEmployee from  './Sidebar/SideBarEmployeeEmployee'

export default function Homepage ({ child }) {
    const roleID = parseInt(localStorage.role_id);
    return (
        <div className='h-screen grid grid-cols-5 gap-x-5' style={{ background: '#F8F9FD' }}>
            {roleID == 1 ? <SideBarAdmin /> : roleID == 2 ? <SideBarUser />: <SideBarEmployee/>}
            <div className='col-span-4 grid grid-rows-6 '>
                <Navbar/>
                <div className='row-span-5 grid grid-cols-7 gap-x-5 mx-3'>
                    <div className='col-span-5'>
                        {child}
                    </div>
                    <div className='col-span-2'>
                    {roleID == 2 ? <QuickUtilityUser/>: roleID == 3 ? <QuickUtilityEmployee/>:<></>} 
                    </div>
                </div>
            </div>
        </div>
    )
}