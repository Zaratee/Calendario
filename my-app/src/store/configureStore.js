import { configureStore } from "@reduxjs/toolkit";
import { appointmentsReducer } from "../reducers/appointmentsReducer";

export default configureStore({
  reducer: {
    appointments: appointmentsReducer ,
  }
});
