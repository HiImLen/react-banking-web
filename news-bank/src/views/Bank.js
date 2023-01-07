import { useEffect, useReducer } from 'react';

import AppContext from '../AppContext.js';
import reducer, { initializer } from '../AppReducer.js';
import Homepage from '../components/Homepage.js';
//import { instance } from '../utils.js';

const Bank = () => {
    const [store, dispatch] = useReducer(reducer, {}, initializer);

    useEffect(() => {

    }, []);

    return (
        <div>
            <AppContext.Provider value={{ store, dispatch }}>
                <Homepage />
            </AppContext.Provider>
        </div>
    )
}

export default Bank
