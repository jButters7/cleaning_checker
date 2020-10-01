const initialState = {
  monthId: null,
  apartmentId: null
}

const SET_CURRENT_MONTH_ID = 'SET_CURRENT_MONTH_ID';
const SET_APARTMENT_ID = 'SET_APARTMENT_ID';

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
    case SET_CURRENT_MONTH_ID:
      return { ...state, monthId: action.payload.monthId };
    case SET_APARTMENT_ID:
      return { ...state, apartmentId: action.payload.apartmentId };
    default:
      return initialState;
  }
}