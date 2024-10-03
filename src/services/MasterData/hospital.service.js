import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../../utils/constants/api.constants";


class HospitalService {

  static getHospital(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken
        }
    }
    return axios
        .post(API_BASE_URL +"/getallhospital", item,config)
        .then((response) => {
            if (response.data) {
            }
            return response.data;
        });
}
static createHospital(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + "/createhospital", item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}

static deleteHospital(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/deletehospital/${id}`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
static editHospital(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/edithospital/${id}`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
  

}
export default HospitalService;
