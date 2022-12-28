import { useEffect, useReducer } from 'react';

import AppContext from '../AppContext.js';
import reducer, { initializer } from '../AppReducer.js';
import NavBar from '../components/NavBar.js';
import { instance } from '../utils.js';

const Bank = () => {
    const [store, dispatch] = useReducer(reducer, {}, initializer);

    useEffect(() => {

    }, []);

    return (
        <div>
            <AppContext.Provider value={{ store, dispatch }}>
                <NavBar />
            </AppContext.Provider>
        </div>
    )
}

export default Bank
