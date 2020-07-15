// import { AUTH_LOGIN, USER_REGISTER, LOGOUT } from "../../constant/type";
const initialState = {
  tutorials: [],
  currentTutorial: {},
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TUTORIALS':
      return {
        ...state,
        tutorials: action.payload,
      };
    case 'DELETE_TUTORIAL':
      const updatedTutorialsArray = state.tutorials.filter(tutorial => tutorial._id !== action.tutorialId);
      return {
        ...state,
        tutorials: updatedTutorialsArray,
      };
    case "GET_TUTORIAL":
      const tutorialsArray = [...state.tutorials]
      const currentTutorial = tutorialsArray.find(tutorial => tutorial._id === action.tutorialId)
      return {
        ...state,
        currentTutorial,
      };

    case "UPDATE_TUTORIAL":
      const tutorials = [...state.tutorials]
      const tutorial = tutorials.find(tutorial => tutorial._id === action.tutorialId)
      tutorial.title = action.data.title;
      tutorial.description = action.data.description;
      return {
        ...state,
        tutorials
      }

    case "ADD_TUTORIAL":
      const oldTutorialsArray = [...state.tutorials]
      const newTutorial = {}; 
      newTutorial.title = action.data.title;
      newTutorial.description = action.data.description;
      oldTutorialsArray.push(newTutorial)
      return {
        ...state,
        tutorials: oldTutorialsArray
      }

    default:
      return {
        ...state,
      };
  }
};

export default Reducer;
