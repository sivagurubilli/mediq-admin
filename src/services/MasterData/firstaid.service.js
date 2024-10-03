import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../../utils/constants/api.constants";


class FirstAidService {


  static getfirstAid(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
    return axios
        .post(API_BASE_URL +"/getallfirstaid", item,config)
        .then((response) => {
            if (response.data) {
            }
            return response.data;
        });
}
static createfirstAid(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + "/createfirstaid", item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}

static deletefirstAid(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/deletefirstaid/${id}`, item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
static editfirstAid(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/editfirstaid/${id}`, item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
  

}
export default FirstAidService;
