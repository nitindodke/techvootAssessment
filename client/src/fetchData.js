import axios from "axios";

const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";



const requestData = () => ({ type: FETCH_DATA_REQUEST });
const receivedData = initialData => ({ type: FETCH_DATA_SUCCESS, payload: initialData });
const dataError = () => ({ type: FETCH_DATA_FAILURE, payload: "data error" });

export const fetchInitialData = (url, header, body) => (dispatch, getState) => {
  console.log("request data : ", body);
  dispatch(requestData());
  return axios.post(url, body)
    .then(function (response) {
      dispatch(receivedData(response))
    })
    .catch(function (error) {
      dispatch(dataError(error))
    });
};



export default function reducer(state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return { ...state, initialData: action.payload };

    case FETCH_DATA_FAILURE:
      return { ...state, error: true };

    default:
      return state;
  }
}