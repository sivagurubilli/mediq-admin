import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../../utils/constants/api.constants";


class BookingManagerService {

  static getBookingManagers(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken
        }
    }
    return axios
        .post(API_BASE_URL +"/getallbookingmanager", item,config)
        .then((response) => {
            if (response.data) {
            }
            return response.data;
        });
}
static createBookingManagers(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + "/addbookingmanager", item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}

static deleteBookingManagers(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/deletebookingmanager/${id}`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
static editBookingManagers(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/editbookingmanager/${id}`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}



static assignBookingManagers(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/assignBookingManager`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  

}
export default BookingManagerService;
