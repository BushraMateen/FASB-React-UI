import React, {useState} from 'react';
import './App.scss';
import { Header } from './components/Header'
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Home from './components/Home';
import Footer from './components/Footer';

import ManageQuarter from "./components/ManageQuarter";
import InputWizard from "./components/InputWizard";
import Inventory from "./components/Inventory";
import Control from "./components/Control";
import Reports from "./components/Reports";
function App() {
  return (
    <Router>
        <div className="content">
        <div className='logoBar'> 
              <div className='project-name d-flex'>
                  <span className="mx-0 my-auto logo">
                      FASB 1671
                  </span>
              </div>
              <div>
                  <span>
                      Welcome Mastan!
                  </span>
              </div>
          </div>
          <div className="main-content">
            <Header projectName={'FASB 167'} />
            <div class="vl"></div>
            <Route exact path="/" component={ManageQuarter} /> 
            <Route path = "/ManageQuarter" component={ManageQuarter} />
            <Route path = "/InputWizard" component={InputWizard} />
            <Route path = "/Inventory" component={Inventory} />
            <Route path = "/Control" component={Control} />
            <Route path = "/Reports" component={Reports} />
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
    </Router>
  );
}

export default App;
