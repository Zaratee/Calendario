import { useEffect, useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Filter from './components/Filter';
import { dateSelectedContext as DateSelectedContext } from './useContext/context';
import { getAllSessionStorageApointments, getAppointmentsAltoMobile } from './actions/appointmentsActions';

import { connect } from "react-redux";

const App = (props) => {
  const {loadAppointmentsAltoMobile, loadAppointmentsSessionStorage} = props

  var date = new Date();
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth())

  useEffect(() => {
      loadAppointmentsSessionStorage()
      loadAppointmentsAltoMobile()
  }, []);
  
  return (
      <DateSelectedContext.Provider value={{month: month, year: year, setYear: setYear, setMonth: setMonth}}>
        <div className="w-screen h-screen bg-gradient-to-r from-[#fef1d8] to-[#f79b66] p-8 flex flex-col gap-1">
          <Filter />
          <Calendar/>
        </div>
      </DateSelectedContext.Provider>

  );
}

const actions = (dispatch, ownProps) => {
  return {
    loadAppointmentsAltoMobile() {
      getAppointmentsAltoMobile()(dispatch);
    },
    loadAppointmentsSessionStorage() {
      getAllSessionStorageApointments()(dispatch);
    }
  };
};

export default connect(null, actions)(App);


