import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../../utils/constants/api.constants";


class DriverService {

  static getDrivers(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken
        }
    }
    return axios
        .post(API_BASE_URL +"/getAlldriver", item,config)
        .then((response) => {
            if (response.data) {
            }
            return response.data;
        });
}
static createDrivers(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + "/adddriver", item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}

static deleteDrivers(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/deletedriver/${id}`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
static editDrivers(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/editdriver/${id}`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
  

}
export default DriverService;
