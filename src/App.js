import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CountryPage from './countryPage';
import Header from './Header';
import Countries from './Countries';
import SearchForCountry from './SearchForCountry';
import FilterByRegion from './FilterByRegion';


import './App.css';


const getCountries = () => {
    return new Promise((resolve,reject) => {
        fetch('https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;subregion;currencies;languages;borders;topLevelDomain;nativeName;alpha3Code;flag')
        .then(data => data.json())
        .then(listCountries => {
        resolve(listCountries);
      })
        .catch((err)=>{
            reject(err)
        })
    })
}

function App(){

    const [countries, setListCountries] = useState([]);
    const [searchedCountry, setSearchedCountry] = useState("");
    const [searchedRegion, setSearchedRegion] = useState("");
    const [isDarkMode, setDarkMode] = useState(false);

    let darkModeMain = {
      backgroundColor: "hsl(207, 26%, 17%)",
      color: "hsl(0, 0%, 100%)"
    }
  
    let darkModeElement = {
      backgroundColor: "hsl(209, 23%, 22%)",
      color:"hsl(0, 0%, 100%)",
      boxShadow:"none"
    }
  
    let darkHeader = {
      backgroundColor: "hsl(209, 23%, 22%)",
      borderBottom:"none",
      color:"hsl(0, 0%, 100%)"
    }
    
    let searchDark = {
      boxShadow:"none",
      backgroundColor: "hsl(209, 23%, 22%)",
      color:"hsl(0, 0%, 100%)",
      borderRadius:"4px"
    }
  
    let linkStyleLight = {
      textDecoration: "none",
      color: "hsl(200, 15%, 8%)"
    }
  
    let linkStyleDark = {
      textDecoration: "none",
      color:"hsl(0, 0%, 100%)"
    }

    let darkModeButton = {
      boxShadow:"0px 2px 5px 3px #292829",
      color:"hsl(0, 0%, 100%)"

    }

    const stylePopulationNb = (nb) => {
      nb = nb.toString();
      nb = nb.split("").reverse().join("");
      let counter = 0;
      let toReturn = "";
      for(let i=0;i<nb.length;i++){
        if(counter<3){
          toReturn += nb[i];
        } else if(counter===3){
          toReturn += ",";
          toReturn += nb[i];
          counter = 0;
        }
        counter += 1;
    
        }
      return toReturn.split("").reverse().join("");
    }

    useEffect(() => {
        if(countries.length===0){
            getCountries().then(data=> {
            setListCountries(data);
        })
    }
    },[]);

    return(
        <div className="App" style={isDarkMode?darkModeMain:null}>
            <Router>

            <Switch> 
                {/* YEAAHH */}
            {countries.map(item=>{
                return(
                <Route path={`/${item.name}`}>
                    <Header setDarkMode={setDarkMode} isDarkMode={isDarkMode} darkHeader={darkHeader}/>
                    <CountryPage country={item.name} countries={countries} setSearchedCountry={setSearchedCountry} searchedCountry={searchedCountry} isDarkMode={isDarkMode} darkModeElement={darkModeElement} darkModeButton={darkModeButton} stylePopulationNb={stylePopulationNb}/>
                </Route>
                );
            })}    
            


                <Route path="/">
                    <Header setDarkMode={setDarkMode} isDarkMode={isDarkMode} darkHeader={darkHeader}/>
                    <div className="mainWrap">
                      {countries.find(element=>element.name===searchedCountry)!==undefined?<CountryPage setSearchedCountry={setSearchedCountry} searchedCountry={searchedCountry} countries={countries} country={searchedCountry} isDarkMode={isDarkMode} darkModeElement={darkModeElement} darkModeButton={darkModeButton} stylePopulationNb={stylePopulationNb}/>
                      :<React.Fragment><div className="searchItems">
                          <SearchForCountry countries={countries} setSearchedCountry={setSearchedCountry} searchedCountry={searchedCountry} isDarkMode={isDarkMode} setDarkMode={setDarkMode} searchDark={searchDark}/>
                          <FilterByRegion setSearchedRegion={setSearchedRegion} searchedRegion={setSearchedRegion} isDarkMode={isDarkMode} setDarkMode={setDarkMode} searchDark={searchDark}/>
                        </div>
                        <Countries  countries={countries} searchedRegion={searchedRegion} isDarkMode={isDarkMode} darkModeElement={darkModeElement} linkStyleLight={linkStyleLight} linkStyleDark={linkStyleDark} stylePopulationNb={stylePopulationNb}/>
                        </React.Fragment>
                      }
                    </div>
                </Route>
                </Switch>


            </Router>

            
        </div>

    );
}



export default App;