const initialState = {
  userId: null,
  userFirstName: '',
  userLastName: '',
  monthId: null,
  apartmentId: null,
  userType: '',
}

const LOGIN_USER = 'LOGIN_USER';
const SET_CURRENT_MONTH_ID = 'SET_CURRENT_MONTH_ID';
const SET_APARTMENT_ID = 'SET_APARTMENT_ID';
const LOGOUT_USER = 'LOGOUT_USER';


export function loginUser(userId, userFirstName, userLastName, userType) {
  console.log(userType)
  return {
    type: LOGIN_USER,
    payload: {
      userId,
      userFirstName,
      userLastName,
      userType
    }
  }
}

export function setReduxMonthId(monthId) {
  return {
    type: SET_CURRENT_MONTH_ID,
    payload: {
      monthId
    }
  }
}

export function setReduxApartmentId(apartmentId) {
  return {
    type: SET_APARTMENT_ID,
    payload: {
      apartmentId
    }
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: {
      userId: null,
      userFirstName: '',
      userLastName: '',
      monthId: null,
      apartmentId: null,
      userType: '',
    }
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, userId: action.payload.userId, userFirstName: action.payload.userFirstName, userLastName: action.payload.userLastName, userType: action.payload.userType }
    case SET_CURRENT_MONTH_ID:
      return { ...state, monthId: action.payload.monthId };
    case SET_APARTMENT_ID:
      return { ...state, apartmentId: action.payload.apartmentId };
    case LOGOUT_USER:
      return { ...state, userId: action.payload.userId, userFirstName: action.payload.userFirstName, userLastName: action.payload.userLastName, monthId: action.payload.monthId, apartmentId: action.payload.apartmentId, userType: action.payload.userType }
    default:
      return initialState;
  }
}