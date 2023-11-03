import React from "react";

const Form= props =>(

          <form onSubmit={props.getWeather}>
              <input style={({width:'100%'})} type= "text" name="city" placeholder="Toronto, Sokoto, New York"/>
              {/* <input type= "text" name="country" placeholder="COUNTRY"/> */}
              <button>Fetch City Weather</button>
          </form>  
        );

export default Form;
