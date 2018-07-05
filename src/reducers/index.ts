import { ADD_REMINDER, CHECK_REMINDER, DELETE_REMINDER } from "../constants";

const reminder = (action : any) => {
  return {
    checked : false,
    deadline : action.deadline,
    id : Math.floor(Math.random() * 1000),
    text : action.text,
  }
}

const reminders = ( state = [], action : any) => {
  let rem = null;
  state = JSON.parse(localStorage.getItem("reminders") || "[]");
  switch(action.type) {
    case ADD_REMINDER : 
      rem = [...state, reminder(action)]
      localStorage.setItem("reminders", JSON.stringify(rem));
      return rem;
    case DELETE_REMINDER : 
      rem = state.filter((item : any) => item.id !== action.id);
      localStorage.setItem("reminders", JSON.stringify(rem));
      return rem;
    case CHECK_REMINDER :
      rem = state.map((item : any) => {
        if(item.id === action.id) {
          item.checked = !item.checked;
        }
        return item;
      });
      localStorage.setItem("reminders", JSON.stringify(rem));
      return rem;
    default :
      return state;
  }
}

export default reminders;