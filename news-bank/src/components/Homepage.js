/* eslint-disable react/prop-types */
import React from 'react'
import Navbar from './NavBar'
import QuickUtility from './QuickUtility'
import Sidebar from './SideBar'

export default function Homepage ({ child }) {
  return (
        <div className='h-screen grid grid-cols-5 gap-x-5' style={{ background: '#F8F9FD' }}>
            <Sidebar/>
            <div className='col-span-4 grid grid-rows-6 '>
                <Navbar/>
                <div className='row-span-5 grid grid-cols-7 gap-x-5 mx-3'>
                    <div className='col-span-5'>
                        {child}
                    </div>
                    <div className='col-span-2'>
                        <QuickUtility/>
                    </div>
                </div>
            </div>
        </div>
  )
}
