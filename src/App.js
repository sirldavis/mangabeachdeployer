import React from "react";
import CalDateRangePicker from "./CalDateRangePicker";

//import { render } from "react-dom";
// import moment from "moment";
// import DatePicker2 from "./DatePicker2";
// import DateRangePicker from "react-dates";

const App = ()=> {
   
 
   
  const defaultPrice =90;
  const prices = new Map();
  //prices.set(6,[50,45,30,20,30,40,50]);
  //prices.set(8,[50,45,30,20,30,40,50]);
  const bookedDays = new Map();
  bookedDays.set(6, [22,23,24,25,26]);
  bookedDays.set(7, [1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
 

  return (
      <div>
    <hr />
      <CalDateRangePicker bookedDays={bookedDays}
      prices={prices} defaultPrice={defaultPrice} />

      <hr />

    </div>
  );
}
export default App;