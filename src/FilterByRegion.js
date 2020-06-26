import React from 'react';
  
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

  export default FilterByRegion;