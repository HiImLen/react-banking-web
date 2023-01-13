import React, { useReducer } from 'react'

import { Outlet } from 'react-router'
import AppContext from '../AppContext.js'
import reducer, { initializer } from '../AppReducer.js'
import Homepage from '../components/Homepage.js'
import { useDispatch } from 'react-redux'
// import { instance } from '../utils.js';

const Bank = () => {
  const dispatchhing = useDispatch()
  const [store, dispatch] = useReducer(reducer, {}, initializer)

  return (
        <div>
            <AppContext.Provider value={{ store, dispatch }}>
                <Homepage child={<Outlet />} />
            </AppContext.Provider>
        </div>
  )
}

export default Bank
