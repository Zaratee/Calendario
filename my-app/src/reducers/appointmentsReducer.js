import { APPOINTMENTS_UPDATE_ALTOMOBILE_API, APPOINTMENTS_FETCHING, APPOINTMENTS_ERROR, APPOINTMENTS_CREATE_CUSTOM, APPOINTMENTS_GET_SESSION_STORAGE } from "../actions/appointmentsActions";
import moment from "moment";

  const initialState = {
    appointments: [],
    loading: false,
    error: null
  };
  
  export const appointmentsReducer  = (state = initialState, action) => {
    switch (action.type) {
      case APPOINTMENTS_UPDATE_ALTOMOBILE_API:
          {
            const {appointments } = action;
            
            let newAppointmentsList = [...state.newAppointmentsList]
              
            appointments.forEach(appointemnt => {
                var appoinmentDay = moment(appointemnt.time).utc().format('DD')
                var appoinmentMonth = moment(appointemnt.time).utc().format('MM')
                var appoinmentYear = moment(appointemnt.time).utc().format('YYYY')
                newAppointmentsList.push({day:appoinmentDay, month:appoinmentMonth, year: appoinmentYear, name: appointemnt.name})
            });

            const newState = {
            newAppointmentsList: newAppointmentsList,
            loading: false,
            error: null
        };
        return newState;
        
      } break;
  
      case APPOINTMENTS_CREATE_CUSTOM:
          {
            const {newAppointmentsList} = state;
            const {day, month, year} = action.appointment.newCustomAppointment
            const {name} = action.appointment
            var newAppointment = [...newAppointmentsList, {
              day : '' + day,
              month: '' + month,
              year: '' + year,
              name: name
            }]
            const currentDate = new Date();
            const timestamp = currentDate.getTime();
            var key = `${day}_${month}_${year}_${timestamp}`
            window.sessionStorage.setItem(key,name)
            const newState = {
              newAppointmentsList:newAppointment,
              loading: false,
              error: null
            };

        return newState;
        
      } break;
  
      case APPOINTMENTS_GET_SESSION_STORAGE:
      {
        var allKeys = Object.keys(sessionStorage);
        var allApointments = []
        var sessionApointments = []
        allKeys.forEach(appointmentKey => {
          allApointments.push({key: appointmentKey, name:  sessionStorage.getItem(appointmentKey) })
        });
        allApointments.forEach(appointmentSession => {
          var appointmentDate = '' 
          var apointment = [] 
          for (let index = 0; index < appointmentSession.key.length; index++) {
            if(appointmentSession.key[index] != '_'){
              appointmentDate = appointmentDate + appointmentSession.key[index]
            }else{
              apointment.push(appointmentDate)
              appointmentDate = ''
            }
          }
          sessionApointments.push({day:apointment[0], month: apointment[1], year: apointment[2], name: appointmentSession.name})
        })        

        const newState = {
          newAppointmentsList:sessionApointments,
          loading: false,
          error: null
        };
        return newState;
      } break;
  
      case APPOINTMENTS_FETCHING:
      {
        const newState = {
          ...state,
          loading: action.type,
        };
  
        return newState;
      } break;

      case APPOINTMENTS_ERROR:
      {
        const newState = {
          ...state,
          error: action.error
        };
  
        return newState;
      } break;
      default:
        return { ...state };
      
    }
  };