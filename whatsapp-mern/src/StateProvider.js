import React, {createContext,useReducer,useContext} from 'react';

export const StateContext = createContext();

export const StateProvider = ({reducer,initialState,children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext); //allows to pull info from the data layer