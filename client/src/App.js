import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import Timer from './components/Timer';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Statistics from './components/Statistics';


import { TimerContextProvider } from './context/TimerContext';

import { useGlobalContext } from './context/GlobalContext';

function App() {

  const {modal, setModal} = useGlobalContext()

  return (
    <div >
      <BrowserRouter>
        <Header />
        {modal?<div className="modalBackground" onClick={()=>setModal(false)}/>: null}
        {modal?<Settings/>:null}
        <div className="contentContainer">
            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/statistics">
                <Statistics />
              </Route>
              <Route path= "/">
                <TimerContextProvider>
                  <Timer/>
                </TimerContextProvider>
              </Route>
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
