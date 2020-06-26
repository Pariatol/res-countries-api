import React, { useState, useEffect } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";


function CountryPage(props){

    const getCountryInfos =  (name,list) => {
        return  list.find(element => element.name ===name)
    }

    const replaceName = (alpha,list) => {
        let toReturn = list.find(element => element.alpha3Code === alpha);
        return toReturn.name;
    }

    let countryInfos = getCountryInfos(props.country,props.countries);

        return(
        <div className="countryPage" style={props.isDarkMode?props.darkModeElement:null}>

            <div className="countryWrap">
                <Link to="/">
                <button class="backButton" onClick={()=>props.setSearchedCountry("")} style={props.isDarkMode?props.darkModeButton:null}><i class="fas fa-long-arrow-alt-left"></i>&nbsp;&nbsp;&nbsp;Back</button>
                </Link>
                <div className="countryPagePic">
                    <img className="flagPic" src={countryInfos.flag}/>
                </div>

                <div className="countryDescription">
                    <div className="countryDescriptionWrapper">

                    <div className="countryName">
                        {countryInfos.name}
                    </div>
                    <div className="countryDescriptionInfos">
                        <div className="colInfos1">
                            <div className="nativeName infos">
                                <span className="boldWord">Native Name: </span>{countryInfos.nativeName}
                            </div>
                            <div className="population infos">
                            <span className="boldWord">Population: </span>{countryInfos.population}
                            </div>
                            <div className="region infos">
                            <span className="boldWord">Region: </span>{countryInfos.region}
                            </div>
                            <div className="subregion infos">
                            <span className="boldWord">Sub Region: </span>{countryInfos.subregion}
                            </div>
                            <div className="capital infos">
                            <span className="boldWord">Capital: </span>{countryInfos.capital}
                            </div>
                        </div>

                        <div className="colInfos2">
                            <div className="topLevelDomain infos">
                            <span className="boldWord">Top Level Domain: </span>{countryInfos.topLevelDomain.map((item,index)=>{
                                    return index===countryInfos.topLevelDomain.length-1?<span>{item}</span>:<span>{item}, </span>
                                })}
                            </div>

                            <div className="currencies infos">
                            <span className="boldWord">Currencies: </span>{countryInfos.currencies.map((item,index)=>{
                                    return index===countryInfos.currencies.length-1?<span>{item.name}</span>:<span>{item.name}, </span>
                                })}
                            </div>

                            <div className="languages infos">
                            <span className="boldWord">Languages: </span>{countryInfos.languages.map((item,index)=>{
                                    return index===countryInfos.languages.length-1?<span>{item.name}</span>:<span>{item.name}, </span>
                                })}
                            </div>
                        </div>

                    </div>

                    <div className="countryDescriptionBorders">
                        <span className="boldWord borderTitle">Border Countries:&nbsp;&nbsp;&nbsp;&nbsp;</span><div className="borderTitleResponsive boldWord">Border Countries:</div>
                        <div className="borderWrap">
                            {countryInfos.borders.map((item,index)=>{
                                return <div className="borderCountry">{replaceName(item,props.countries)}</div>

                            })
                            }
                        </div>
                    </div>
                </div>
                </div>
            </div>
                            <div className="optionsEmulation hiddenOption"></div>
        </div>
        );
}

export default CountryPage