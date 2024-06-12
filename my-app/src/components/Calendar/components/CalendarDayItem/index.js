import React, { useContext } from 'react'
import { dateSelectedContext } from '../../../../useContext/context';
import { allMonths } from '../../../../data/staticData';
import { connect } from "react-redux";
import { saveCustomAppointment } from '../../../../actions/appointmentsActions';

const CalendarDayItem = (props) => {
  const {dayInfo, createCustomAppointment } = props
  const {numberDay, isOtherMonth } = dayInfo
  var date = new Date();
  const currentDay = date.getDate()
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()
  const selectedDate = useContext(dateSelectedContext)
  const showAppointmentPrompt = () => {
        var appoinmentName = window.prompt(`Enter the name of the appointment of the day ${numberDay}/${allMonths[selectedDate.month].name}/${selectedDate.year}`)
        if(appoinmentName != null && appoinmentName.trim().length > 0 ){
          createCustomAppointment({
            appointment:{month: selectedDate.month + 1, year:selectedDate.year, day:numberDay},
            name: appoinmentName
          })
        }else{
          alert('Invalid appointment name')
        }
    }

  return (
    <div onDoubleClick={!isOtherMonth ? showAppointmentPrompt : null} 
      className={`
      ${currentDay === numberDay && currentMonth === selectedDate.month && currentYear === selectedDate.year && 'bg-palette4 '}
      ${isOtherMonth ? 'cursor-not-allowed': 'cursor-pointer hover:border-[2px] border-palette1'}
      ${isOtherMonth && 'bg-white bg-opacity-25'}
      text-white  w-full h-full p-2 select-none`}>
      {numberDay}
      <div className=' h-[60%] min-h-[20%] overflow-y-auto overflow-x-hidden flex flex-col gap-1 pr-2 pb-2'>
        {
          dayInfo?.appointment.length > 0 && dayInfo?.appointment.map((appointmentDay, index)=>{
            return (
              <div key={index} className='bg-palette5 border border-palette1 p-1 rounded-lg text-wrap text-ellipsis  whitespace-nowrap'>{appointmentDay.name} </div>
            )
          })
        }
      </div>
    </div>
    )
}
const properties = (state, ownProps) => {
  const { appointments } = state;

  return {
    appointments: appointments.newAppointmentsList
  };
};

const actions = (dispatch, ownProps) => {
  return {
    createCustomAppointment(customAppointment ) {
      saveCustomAppointment(customAppointment)(dispatch);
    },
  };
};



export default connect(properties, actions)(CalendarDayItem);


