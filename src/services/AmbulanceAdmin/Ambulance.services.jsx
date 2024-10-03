import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../../utils/constants/api.constants";


class AmbulanceService {

  static getAmbulances(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken
        }
    }
    return axios
        .post(API_BASE_URL +"/getAllAmbulanceprivateadmin", item,config)
        .then((response) => {
            if (response.data) {
            }
            return response.data;
        });
}
static createAmbulances(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + "/addprivateambulanceadmin", item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}

static deleteAmbulances(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/deleteAmbulanceprivateadmin/${id}`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
static editAmbulances(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/editprivateambulanceadmin/${id}`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
  

}
export default AmbulanceService;
