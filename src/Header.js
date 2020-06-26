import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function Header(props){

  
    let noLinkStyle = {
      textDecoration:"none",
      color:"black"
    }
  
  
      return(
        <header className="head"  style={props.isDarkMode?props.darkHeader:null}>
          <div className="headWrapper">
          <Link to="/" style={noLinkStyle}>
  
            <div className="headTitle" style={props.isDarkMode?props.darkHeader:null}>
              Where in the world?
            </div>
            </Link>
  
            <div className="darkModeToggler" onClick={()=>props.setDarkMode(!props.isDarkMode)}>
              <i className="far fa-moon"></i>&nbsp;Dark Mode
            </div>
          </div>
        </header>
      );
    }

    export default Header;