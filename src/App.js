import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CountryPage from './countryPage'

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
                    <CountryPage country={item.name} countries={countries} setSearchedCountry={setSearchedCountry} searchedCountry={searchedCountry} isDarkMode={isDarkMode} darkModeElement={darkModeElement} darkModeButton={darkModeButton}/>
                </Route>
                );
            })}    
            


                <Route path="/">
                    <Header setDarkMode={setDarkMode} isDarkMode={isDarkMode} darkHeader={darkHeader}/>
                    <div className="mainWrap">
                      {countries.find(element=>element.name===searchedCountry)!==undefined?<CountryPage setSearchedCountry={setSearchedCountry} searchedCountry={searchedCountry} countries={countries} country={searchedCountry} isDarkMode={isDarkMode} darkModeElement={darkModeElement} darkModeButton={darkModeButton}/>
                      :<React.Fragment><div className="searchItems">
                          <SearchForCountry countries={countries} setSearchedCountry={setSearchedCountry} searchedCountry={searchedCountry} isDarkMode={isDarkMode} setDarkMode={setDarkMode} searchDark={searchDark}/>
                          <FilterByRegion setSearchedRegion={setSearchedRegion} searchedRegion={setSearchedRegion} isDarkMode={isDarkMode} setDarkMode={setDarkMode} searchDark={searchDark}/>
                        </div>
                        <Countries  countries={countries} searchedRegion={searchedRegion} isDarkMode={isDarkMode} darkModeElement={darkModeElement} linkStyleLight={linkStyleLight} linkStyleDark={linkStyleDark}/>
                        </React.Fragment>
                      }
                    </div>
                </Route>
                </Switch>


            </Router>

            
        </div>

    );
}

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

  function SearchForCountry(props){

    const [searchResult, setSearchResult] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      props.setSearchedCountry(document.querySelector('form').inputCountry.value);
      props.countries.find(element=>element.name===props.searchedCountry)===undefined?setSearchResult("Invalid country name"):setSearchResult("Search for a country...");
      console.log(searchResult);
    }

    return(
      <div className="searchForCountry">
        <form onSubmit={handleSubmit} >
        <input type="text" name="inputCountry" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search for a country..." className={props.isDarkMode?"inputDark":null} style={props.isDarkMode?props.searchDark:null}/>
        <i  className={props.isDarkMode?"fas fa-search searchDarkMode":"fas fa-search"}></i>
        </form>
        {props.searchedCountry!==""?props.countries.find(element=>element.name===props.searchedCountry)===undefined?<div class="searchResult">No Country Found. Try Again.</div>:null:null}

      </div>
  
    )
  }
  
  function FilterByRegion(props){
  
    const handleClick = () => {    
        document.querySelector('.optionsEmulation').classList.toggle('displayToggle');
    }

  
    return(
      <div className="filterByRegion">
  
        {document.onclick = function(e){
                 if(e.target.id !== 'me'){
                    document.querySelector('.optionsEmulation').classList.remove('displayToggle');
                 }
        }}
        <div class="selectEmulation" id="me"  onClick={handleClick} style={props.isDarkMode?props.searchDark:null}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filter by Region
              <i class="fas fa-sort-down"></i>
  
          <div class="optionsEmulation" style={props.isDarkMode?props.searchDark:null}>
            <div onClick={()=>props.setSearchedRegion('Africa')} class="Africa option">Africa</div>
            <div onClick={()=>props.setSearchedRegion('Americas')} class="America option">America</div>
            <div onClick={()=>props.setSearchedRegion('Asia')} class="Asia option">Asia</div>
            <div onClick={()=>props.setSearchedRegion('Europe')} class="Europe option">Europe</div>
            <div onClick={()=>props.setSearchedRegion('Oceania')} class="Oceania option">Oceania</div>
  
  
  
          </div>
          
        </div>
  
      </div>
  
    )
  }


export default App;