// import React from "react";
// import moment from "moment";
//import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from "./CalDateRangePicker";
//import format from "date-fns/format";
//import parseISO from "date-fns/parseISO";

// https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
// converts from moment which use non-standard formats, to date-fns use https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
const fixDateFns2Format = format =>
  format
    .replace("YYYY", "yyyy") // full year
    .replace(/\bDD\b/, "dd") // day of month, short
    .replace("dddd", "cccc"); // day of week, long

//export default function DatePicker2({ date, onChange }) {
  //return (
    // <DatePicker
    //   autoComplete="off"
    //   className="rd2"
    //   // selected={date && parseISO(date)}
    //   selected={date.toDate()}
    //   onChange={d => {
    //     onChange({ target: { value: moment(d) /*format(d, "yyyy-MM-dd")*/ } });
    //   }}
    //   dateFormat={fixDateFns2Format("YYYY-MM-DD")}
    //   withPortal={window.innerWidth < 400}
    //   filterDate={d => d.getDay() !== 6 && d.getDay() !== 0}
    // />
  // );
//}
