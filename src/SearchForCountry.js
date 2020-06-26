import React, { useState, useEffect } from 'react';

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

  export default SearchForCountry;