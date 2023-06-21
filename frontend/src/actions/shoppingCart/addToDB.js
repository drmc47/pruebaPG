import axios from "axios";

export default function addToDB(payload) {
    return async function (dispatch) {
      try {
        let response = await axios.post("http://localhost:8001/userShoppingCart",payload);
         return dispatch({
            type: "CLICK_USER_LOGGED",
            payload: response.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
 }
 