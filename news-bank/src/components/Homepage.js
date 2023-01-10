import React from 'react';
import HomepageCP from './Homepage/HomepageCP';
import Sidebar from './SideBar';
import Navbar from './NavBar';
import QuickUtility from './QuickUtility';

export default function Homepage(props) {


    return (
        <div className='h-screen grid grid-cols-5 gap-x-5'>
            <Sidebar/>
            <div className='col-span-4 grid grid-rows-6 '>
                <Navbar/>
                <div className='row-span-5 grid grid-cols-7 gap-x-5 mx-3'>
                    <div className='col-span-5'>
                        <HomepageCP/>  
                    </div>
                    <div className='col-span-2'>
                        <QuickUtility/>
                    </div>
                </div>
                
            </div>

        </div>
 
    );
}