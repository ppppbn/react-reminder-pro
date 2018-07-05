import { ADD_REMINDER, CHECK_REMINDER, DELETE_REMINDER } from "../../constants";

export const addReminder = (text : any , deadline : any) => {
  const action = {
    deadline,
    text,
    type : ADD_REMINDER    
  }
  return action;
}

export const deleteReminder = (id : number) => {
  const action = {
    id,
    type: DELETE_REMINDER
  }
  return action;
}

export const checkReminder = (id : number) => {
  const action = {
    id,
    type: CHECK_REMINDER
  }
  return action;
}