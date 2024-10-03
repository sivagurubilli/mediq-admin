import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../../utils/constants/api.constants";


class FirstAidCategoryService {


  static getfirstAidCategory(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
    return axios
        .post(API_BASE_URL +"/getalladdfirstaid", item,config)
        .then((response) => {
            if (response.data) {
            }
            return response.data;
        });
}
static createfirstAidCategory(item) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + "/addfirstaid", item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}

static deletefirstAidCategory(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/deleteAddFirstAID/${id}`, item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
static editfirstAidCategory(item,id) {
    var user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            authorization:user?.accessToken 
        }
    }
  return axios
      .post(API_BASE_URL + `/editAddFirstAID/${id}`, item,config)
      .then((response) => {
          if (response.data) {
          }
          return response.data;
      });
}
  
  

}
export default FirstAidCategoryService;
