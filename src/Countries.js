import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function Countries(props){


    let noLinkStyle = {
      textDecoration:"none",
      color:"black"
    }


    return(
      <div className="countries">
        {
          props.searchedRegion===""?
          props.countries.slice(0,9).map((item,index)=>{
            return(
            <Link to={`/${item.name}`}  style={props.isDarkMode?props.linkStyleDark:props.linkStyleLight}>
            {index===8?<div className="hiddenDiv"></div>:
            <div className="country" style={props.isDarkMode?props.darkModeElement:null} key={item.name}>
              <div className="imgWrap"><img className="countryPic" src={item.flag}/></div>
              <div className="aboutCountry">
                <div className="countryName">{item.name}</div>
                <div className="countryPopulation countryInfo"><span className="boldWord">Population:</span> {item.population}</div>
                <div className="countryRegion countryInfo"><span className="boldWord">Region:</span> {item.region}</div>
                <div className="countryCapital countryInfo"><span className="boldWord">Capital:</span> {item.capital}</div>
              </div>
  
            </div>
            }
            </Link>
            
            );
            
          }):props.countries.filter(item=>item.region===props.searchedRegion).map((item,index)=>{
            return(
            <Link to={`/${item.name}`}  style={props.isDarkMode?props.linkStyleDark:props.linkStyleLight}>
            {index===props.countries.filter(item=>item.region===props.searchedRegion).length-1?<div className="hiddenDiv"></div>:
            <div className="country" key={item.name} style={props.isDarkMode?props.darkModeElement:null} key={item.name}>
              <div className="imgWrap"><img className="countryPic" src={item.flag}/></div>
              <div className="aboutCountry">
                <div className="countryName">{item.name}</div>
                <div className="countryPopulation countryInfo"><span className="boldWord">Population:</span> {item.population}</div>
                <div className="countryRegion countryInfo"><span className="boldWord">Region:</span> {item.region}</div>
                <div className="countryCapital countryInfo"><span className="boldWord">Capital:</span> {item.capital}</div>
              </div>
  
            </div>
            }
            </Link>
            
            );
            
          })
        }
  
      </div>
    );
  }

  export default Countries;