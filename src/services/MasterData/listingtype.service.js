import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../../utils/constants/api.constants";


class LystingTypeService {

  static getListingType(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken
        }
    }
    return axios
        .post(API_BASE_URL +"/getalllisting", item,config)
        .then((response) => {
            if (response.data) {
            }
            return response.data;
        });
}
static createListingType(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + "/lists", item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}

static deleteListingType(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/deletelisting/${id}`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
static editListingType(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/editlisting/${id}`,item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
  

}
export default LystingTypeService;
