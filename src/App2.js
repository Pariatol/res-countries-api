import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CountryPage from './countryPage'

import './App.css';

function App() {

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
    borderBottom:"none"
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

  const [countries, setListCountries] = useState([]);
  const [isDarkMode, setDarkMode] = useState(false);
  const [whichCountry, setCountry] = useState("");





  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  }

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

  useEffect(() => {
    if(countries.length===0){
        getCountries().then(data=> {
          setListCountries(data);
          console.log(data);
      })
    }
  },[]);

  return (
    <div className="App"  style={isDarkMode?darkModeMain:null}>
      

          <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} setDarkMode={setDarkMode} darkHeader={darkHeader}/>
          {whichCountry===""?
            <div className="mainWrap">
              <div class="boxes">
                <SearchForCountry toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} setDarkMode={setDarkMode} searchDark={searchDark}/>
                <FilterByRegion toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} setDarkMode={setDarkMode} searchDark={searchDark}/>
              </div>
              
              <Countries countries={countries} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} setDarkMode={setDarkMode} darkModeElement={darkModeElement} linkStyleLight={linkStyleLight} linkStyleDark={linkStyleDark} whichCountry={whichCountry} setCountry={setCountry}/>
            </div>:<CountryPage whichCountry={whichCountry} countries={countries}/>}
    </div>
  );
}

function Header(props){
  return(
    <header className="head" style={props.isDarkMode?props.darkHeader:null}>
      <div className="headWrapper">
        <div className="headTitle">
          Where in the world?
        </div>
        <div className="darkModeToggler" onClick={props.toggleDarkMode}>
          <i className="far fa-moon"></i>&nbsp;Dark Mode
        </div>
      </div>
    </header>
  );
}

function Countries(props){

  const handleClick = (item) => {
    props.setCountry(item);
  }
  return(
    <div className="countries">
      {
        props.countries.slice(0,8).map(item=>{
          return(
          <Router>
          <Link to={"/"+item.name} style={props.isDarkMode?props.linkStyleDark:props.linkStyleLight}> 
          <div className="country"  style={props.isDarkMode?props.darkModeElement:null} onClick={()=>handleClick(item.name)}>
            <div className="imgWrap"><img className="countryPic" src={item.flag}/></div>
            <div className="aboutCountry">
              <div className="countryName">{item.name}</div>
              <div className="countryPopulation countryInfo"><span className="boldWord">Population:</span> {item.population}</div>
              <div className="countryRegion countryInfo"><span className="boldWord">Region:</span> {item.region}</div>
              <div className="countryCapital countryInfo"><span className="boldWord">Capital:</span> {item.capital}</div>
            </div>

          </div>
          </Link>

          <Switch>
          <Route path={"/"+item.name} >
            <CountryPage/>
          </Route>

          
        </Switch>
          </Router>
          
          );
          
        })
      }

    </div>
  );
}

function SearchForCountry(props){
  return(
    <div className="searchForCountry">
      <input type="text" placeholder="Search for a country..." className={props.isDarkMode?"inputDark":null} style={props.isDarkMode?props.searchDark:null}/>
      <i  className={props.isDarkMode?"fas fa-search searchDarkMode":"fas fa-search"}></i>
    </div>

  )
}

function FilterByRegion(props){

  const handleClick = () => {    
      document.querySelector('.optionsEmulation').classList.toggle('displayToggle');
  }

  return(
    <div className="filterByRegion">

      {/* {document.onclick = function(e){
               if(e.target.id !== 'me'){
                  document.querySelector('.optionsEmulation').classList.remove('displayToggle');
               }
      }} */}
      <div class="selectEmulation" id="me"  onClick={handleClick} style={props.isDarkMode?props.searchDark:null}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filter by Region
            <i class="fas fa-sort-down"></i>

        <div class="optionsEmulation" style={props.isDarkMode?props.searchDark:null}>
          <div class="Africa option">Africa</div>
          <div class="America option">America</div>
          <div class="Asia option">Asia</div>
          <div class="Europe option">Europe</div>
          <div class="Oceania option">Oceania</div>



        </div>
        
      </div>

    </div>

  )
}

export default App;
