import React from 'react';
//import HomepageCP from './Homepage/HomepageCP';
import InterTransfer from './FundTransfer/InterTransfer/InterTransfer';
//import FundTransfer from './FundTransfer/FundTransfer';
import Sidebar from './SideBar';
import Navbar from './NavBar';
import QuickUtility from './QuickUtility';
import InternalTransfer from './FundTransfer/InternalTransfer';

export default function Homepage() {
    return (
        <div className='h-screen grid grid-cols-5 gap-x-5'>
            <Sidebar/>
            <div className='col-span-4 grid grid-rows-6 '>
                <Navbar/>
                <div className='row-span-5 grid grid-cols-7 gap-x-5 mx-3'>
                    <div className='col-span-5'>
                        <InternalTransfer/>  
                    </div>
                    <div className='col-span-2'>
                        <QuickUtility/>
                    </div>
                </div>
            </div>
        </div>
    );
}