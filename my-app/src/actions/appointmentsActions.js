
export const APPOINTMENTS_ERROR = "@APPOINTMENTS/ERROR";
export const APPOINTMENTS_UPDATE_ALTOMOBILE_API = "@APPOINTMENTS/UPDATE_ALTOMOBILE_API";
export const APPOINTMENTS_CREATE_CUSTOM = "@APPOINTMENTS/CREATE_CUSTOM";
export const APPOINTMENTS_FETCHING = "@APPOINTMENTS/FETCHING";
export const APPOINTMENTS_GET_SESSION_STORAGE = "@APPOINTMENTS/APPOINTMENTS_GET_SESSION_STORAGE";

const fetching = (fetching = true) => {
  return { type: APPOINTMENTS_FETCHING, fetching };
}
const fetchingError = (error = "Unkown Error") => {
  return { type: APPOINTMENTS_ERROR, error };
}
const updateAppointmentsApi = (appointments = []) => {
  return { type: APPOINTMENTS_UPDATE_ALTOMOBILE_API, appointments };
}
const createCustomAppointments = (appointment = {}) => {
  return { type: APPOINTMENTS_CREATE_CUSTOM, appointment };
}
const getSessionStorageApointments = () => {
  return { type: APPOINTMENTS_GET_SESSION_STORAGE };
}


export const getAppointmentsAltoMobile =  () => (dispatch) => {
    dispatch(fetching());
    fetch('https://altomobile.blob.core.windows.net/api/test.json')
    .then((response) => response.json())
    .then((data) => {
        dispatch(updateAppointmentsApi(data));
    })
    .catch((err) => {
      dispatch(fetchingError(err.message));
    });
}

export const saveCustomAppointment = (customAppointment) => (dispatch) => {
  const {appointment, name} = customAppointment
  dispatch(createCustomAppointments({newCustomAppointment:appointment, name: name}))
}

export const getAllSessionStorageApointments = () => (dispatch) =>  {
  dispatch(getSessionStorageApointments())
}