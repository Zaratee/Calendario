import React, { useContext, useEffect, useState } from 'react'
import { weekDays, allMonths } from '../../data/staticData'
import { dateSelectedContext } from '../../useContext/context'
import CalendarDayItem from './components/CalendarDayItem'
import { connect } from "react-redux";


const Calendar = (props) => {  
  const {appointments, error} = props
  const selectedDate = useContext(dateSelectedContext)
  var currentMonthDays = []
  var prevMonthDays = []
  var nextMonthDays = []

  const [monthDays, setMonthDays] = useState()

  useEffect(() => {
    error && alert(error)
  }, [error])
  
  useEffect(() => {
    setCurrentMonthDays()
  }, [selectedDate, appointments])
  
  const setCurrentMonthDays = () => {
    var firstDayCurrentMonth = `${new Date(selectedDate.year, selectedDate.month, 1)}`.slice(0,3);
    const weekDay = (day) => day.name === firstDayCurrentMonth;
    var firstdayMonthPosition = weekDays.findIndex(weekDay)
    var lastDay = `${new Date(selectedDate.year, selectedDate.month + 1, 0)}`.slice(8,10);
    
    for (let index = 0; index < lastDay; index++) {
      currentMonthDays.push({ isOtherMonth:false , numberDay: index + 1, appointment: []})
    }
    if (firstdayMonthPosition > 0 ) {
      var lastDayNumberPrevMonth = `${new Date(selectedDate.year, selectedDate.month  , 0)}`.slice(8,10);
      for (let index = 0; index < firstdayMonthPosition; index++) {
        prevMonthDays.push({ isOtherMonth:true , numberDay: lastDayNumberPrevMonth - index, appointment: []})
      }
    }
    if(currentMonthDays?.length + prevMonthDays?.length > 35){
      for (let index = 0;  42 - index   > currentMonthDays?.length + prevMonthDays?.length; index++) {
        nextMonthDays.push({ isOtherMonth:true , numberDay: index + 1, appointment: [] })
      }
    }else {
      for (let index = 0;  35 - index   > currentMonthDays?.length + prevMonthDays?.length; index++) {
        nextMonthDays.push({ isOtherMonth:true , numberDay: index + 1, appointment: [] })
      }
    }
    setMonthDays(prevMonthDays.reverse().concat(currentMonthDays).concat(nextMonthDays))
    setAllApointmentsOfMonth()
  }

  const setAllApointmentsOfMonth = () => {
    if(appointments === undefined){
      return
    }
    const isAppointmentCurrentMonth = appointments.filter((appointment) => parseInt(appointment.month)-1 === selectedDate.month && appointment.year === selectedDate.year);
    if(isAppointmentCurrentMonth.length > 0 ){
      isAppointmentCurrentMonth?.forEach(appointment => {
        const findDay = (month) => month.numberDay === parseInt(appointment.day);
        currentMonthDays[currentMonthDays.findIndex(findDay)].appointment = [...currentMonthDays[currentMonthDays.findIndex(findDay)].appointment , appointment]
      });
    }
  }
  
  return (
    <div className=' w-full h-full bg-palette6 rounded-xl flex flex-col gap-2 overflow-hidden'>
      <div className='text-center w-full mt-2 font-mono text-4xl font-bold text-clndrText px-2'>
        {selectedDate.year + ' ' + allMonths[selectedDate.month].name}
      </div>
      <div className='grid grid-cols-7 grid-rows-1'>
        {
          weekDays.map((day, index)=> {
            return(
            <div key={day.id} className={`text-center mb-1 border-b-[2px] border-b-clndrText font-mono font-bold text-lg pt-3  text-clndrText ${index < 6 && 'border-r-clndrText border-r'}`}>{day.name}</div>
          )})
        }
       
      </div>
      <div className={`${monthDays?.length > 35 ? 'grid-rows-6' : 'grid-rows-5'} grid grid-cols-7  w-full h-full text-right min-h-[300px]`}>
       {
          monthDays?.map((day, index)=> {
            return(
             <CalendarDayItem key={index} dayInfo={day}/> 
          )})
       }
      </div>
    </div>
  )
}

const properties = (state, ownProps) => {
  const { newAppointmentsList, loading, error } = state.appointments;
  return {
    appointments: newAppointmentsList,
    loading, 
    error
  };
};



export default connect(properties)(Calendar);
