
import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../utils/constants/api.constants";

class AuthService {
    static login(item) {
        return axios
            .post(API_BASE_URL + "/login", item)
            .then((response) => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    static hospitalLogin(item) {
        return axios
            .post(API_BASE_URL + "/hospitaladminlogin", item)
            .then((response) => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    static Forgotpassword(item) {

        let user = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: {
                authorization:user?.accessToken || "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IkZNbktFZmpiTDQifSwiaWF0IjoxNzI1ODU5NzgzfQ.T74lE7kZ2Zw8-X3i9hpk876JQRxrTE8f-48L049OSkf1XOIV_1ZLj0lQHqKb_QUeKveaCZeYMUl-OO-4cSKu5_aA4gqXkF2c2AwVnKwX2VqexPle-x02H-I1fg4EMg3l7vvTbvULyQN4sB6zxy4FAae7N-0CCADrKQBhgiUBMzlUeaNQKIeIuXpZ-VP53ZS2XBo3812-W6isjQwBlROiVgEgXerCG1nl80V6SRymnKLIDOzvYBWsGIXRJ-q6pNe1pVD4ImqRHSSf-PbZAVsCugambnRX9oftlNcUnS0wwRB2YnwAnit4NHVhPf3i_G32BmdhSv6nKE5Y_y2Ww96P62iarqe31yCZbtiynmuQ_pz03WAYXvynqSWLRxj4dr7N_fwTa9rH7iJKTfiBLVMbyLGSiYJE9PKNT2tdlMhekt8SPss_ssFs503KS3fzyxeQ040KixW2jA_9uNpXtpC6x-BbYjLiIlKvuqXJugLnVxYeSZbm4XE2ys1uQSKvCRcWg2qLwWej80D6LYfufWIzwFuxvQaIbdYK7rRFNL-SoiYvrS7bEs3sMFtdVKPHrzv91R34qQoxwbdLcg_flSb1vRw-a48reFwBeLbyec5JHrQVhpD_8yBfs-PabOJ5w7mSyiKj0f5mBWGIqmtGS_8B9fqD9qDnczIS4UWBjeWIoG8"
        
        }
        };
        
        return axios
            .post(API_BASE_URL + "/forgetpassword",item,config)
            .then((response) => {
                if (response.data) {
                }
                return response.data;
            });
    }

    static Updatepassword(item) {
        let user = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: {
                authorization:user?.accessToken || "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IkZNbktFZmpiTDQifSwiaWF0IjoxNzI1ODU5NzgzfQ.T74lE7kZ2Zw8-X3i9hpk876JQRxrTE8f-48L049OSkf1XOIV_1ZLj0lQHqKb_QUeKveaCZeYMUl-OO-4cSKu5_aA4gqXkF2c2AwVnKwX2VqexPle-x02H-I1fg4EMg3l7vvTbvULyQN4sB6zxy4FAae7N-0CCADrKQBhgiUBMzlUeaNQKIeIuXpZ-VP53ZS2XBo3812-W6isjQwBlROiVgEgXerCG1nl80V6SRymnKLIDOzvYBWsGIXRJ-q6pNe1pVD4ImqRHSSf-PbZAVsCugambnRX9oftlNcUnS0wwRB2YnwAnit4NHVhPf3i_G32BmdhSv6nKE5Y_y2Ww96P62iarqe31yCZbtiynmuQ_pz03WAYXvynqSWLRxj4dr7N_fwTa9rH7iJKTfiBLVMbyLGSiYJE9PKNT2tdlMhekt8SPss_ssFs503KS3fzyxeQ040KixW2jA_9uNpXtpC6x-BbYjLiIlKvuqXJugLnVxYeSZbm4XE2ys1uQSKvCRcWg2qLwWej80D6LYfufWIzwFuxvQaIbdYK7rRFNL-SoiYvrS7bEs3sMFtdVKPHrzv91R34qQoxwbdLcg_flSb1vRw-a48reFwBeLbyec5JHrQVhpD_8yBfs-PabOJ5w7mSyiKj0f5mBWGIqmtGS_8B9fqD9qDnczIS4UWBjeWIoG8"
        
        }
        };
        return axios
            .post(API_BASE_URL + "/reset-password", item,config)
            .then((response) => {
                if (response.data) {
                }
                return response.data;
            });
    }


    static removeUserDetails() {
        localStorage.removeItem("user");
    }

    static getUserDetails() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default AuthService;
