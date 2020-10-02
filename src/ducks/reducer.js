const initialState = {
  userId: null,
  userFirstName: null,
  userLastName: null,
  monthId: null,
  apartmentId: null
}

const LOGIN_USER = 'LOGIN_USER';
const SET_CURRENT_MONTH_ID = 'SET_CURRENT_MONTH_ID';
const SET_APARTMENT_ID = 'SET_APARTMENT_ID';


export function loginUser(userId, userFirstName, userLastName) {
  return {
    type: LOGIN_USER,
    payload: {
      userId,
      userFirstName,
      userLastName
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, userId: action.payload.userId, userFirstName: action.payload.userFirstName, userLastName: action.payload.userLastName }
    case SET_CURRENT_MONTH_ID:
      return { ...state, monthId: action.payload.monthId };
    case SET_APARTMENT_ID:
      return { ...state, apartmentId: action.payload.apartmentId };
    default:
      return initialState;
  }
}