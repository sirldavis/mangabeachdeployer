import React, { useState } from "react";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "./CalDateRangePicker.css";

export default function CalDateRangePicker({  bookedDays, prices, defaultPrice }) {
  const [date1, setDate1] = useState(moment(new Date()));
  const [date2, setDate2] = useState(moment(new Date()).add(2, 'd'));
  const [focusedInput, setFocusedInput] = useState("startDate");

  const numberOfNights = (a, b) => {
    if (a == null || b == null)
      return 0;
    return date2.diff(date1, 'days');
  }
  const computePrice = (a, b) => {
    if (a == null || b == null)
    return 0;

    //need to iterate from a to before b and add prices:
    var checkDate=moment(a);
    var total=0;
    while (checkDate.isBefore(b)) {
      const aprice = getPrice(checkDate.month(), checkDate.date()-1);
      total+=aprice;
      checkDate.add(1,'days');
    }
    return total;
  }
  const setDate3 = (a, b) => {
    setDate1(a.startDate); 
    setDate2(a.endDate);
  };

  const renderDayContents = (text, date) => {
    const mon = text.month();
    const a = text.date();
    // console.log(mon);
    // console.log( "date: "+bookedDays.get(mon));  
    const dayView = (bookedDays.has(mon) ? bookedDays.get(mon) : []).includes(a)
      ? "X"
      : a;
    var dayPrice = getPrice(mon, a-1);
    return <div >
      <div>{dayView}</div>
      <div className="price" >${dayPrice}</div>
    </div>
  }
  const onFocusChange = (focusedInput) => {
    //console.log("focusedInput: "+focusedInput);
    setFocusedInput(
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput === "startDate" ? "endDate" : focusedInput
    );
  }

  return (
 /*
 The DayPickerRangeController component is a fully controlled version of the DayPicker that has built-in rules for selecting a date range. Unlike the DayPicker, which requires the consumer to explicitly define onDayMouseEnter, onDayMouseLeave, and onDayClick handlers, the consumer needs simply to maintain the focusedInput, startDate, and endDate values in state and then pass these down as props along with onFocusChange and onDatesChange callbacks that update them appropriately. You can see an example of this implementation here.
 Note that the focusedInput prop may be null, but if this is the case, dates are not selectable. As a result, in the example wrapper, we always force focusedInput to be truthy in the onFocusChange method.
 The DayPickerRangeController is particularly useful if you are interested in the DateRangePicker functionality and calendar presentation, but would like to implement your own inputs. 
 https://github.com/airbnb/react-dates/blob/master/examples/DayPickerRangeControllerWrapper.jsx
 */
    <div>
      <DayPickerRangeController
        hideKeyboardShortcutsPanel
        numberOfMonths={window.innerWidth < 600 ? 1 : 2}
        renderDayContents={renderDayContents}
        startDate={date1} // momentPropTypes.momentObj or null,

        endDate={date2} // momentPropTypes.momentObj or null,
        onDatesChange={OnDatesChange()} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => onFocusChange(focusedInput)} // PropTypes.func.isRequired,
        //initialVisibleMonth={() => moment().add(3, "M")} causes bug! PropTypes.func or null,
      />
      <input type="button" value="Clear" onClick={() => { clearCalendar(); }}></input>
        {bookingMsg()}
    </div>
  );
  function bookingMsg() {
    if (date1!=null && date2!=null) {
    const costmsg =  numberOfNights(date1, date2)
      + " nights = $" +
      computePrice(date1, date2);
     
    const checkinmsg ="16:00 "+date1.format("MMM Do dddd")
    const checkoutmsg =" 11:00 "+ date2.format("MMM Do dddd");
    return <ul className="liststyle">
      <li>{costmsg}</li>
      <li>{checkinmsg}</li>
      <li>{checkoutmsg}</li>
      </ul>
      }
  }
  function OnDatesChange() {
    if (date1 != null) {
      const mon = date1.month();
      const a = date1.date();
      const dayView = (bookedDays.has(mon) ? bookedDays.get(mon) : []).includes(a);
      if (dayView) {
        clearCalendar();   
        return;
      }
    }
    return ({ startDate, endDate }) => setDate3({ startDate, endDate });
  }

  function clearCalendar() {
    setDate1(null);
    setDate2(null);
    setFocusedInput("startDate");
  }

  function getPrice(mon, a) {
    var dayPrice = (prices.has(mon) ? prices.get(mon)[a] : defaultPrice);
    if (dayPrice == null)
      dayPrice = defaultPrice;
    return dayPrice;
  }
}

/*
https://github.com/airbnb/react-dates/blob/master/examples/DayPickerRangeControllerWrapper.jsx



 <SingleDatePicker
    numberOfMonths={window.innerWidth < 600 ? 1 : 2}
    onDateChange={date => onChange({ target: { value: date } })}
    onFocusChange={({ focused }) => setFocused(focused)}
    focused={focused}
    date={date}
    displayFormat="YYYY-MM-DD"
    isDayBlocked={m => m.day() === 6 || m.day() === 0}
    hideKeyboardShortcutsPanel
    // withPortalenPortal={window.innerWidth < 400}
*/
