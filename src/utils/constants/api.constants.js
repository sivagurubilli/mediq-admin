
export const API_BASE_URL = 
 process.env.API_BASE_URL || "http://192.168.1.9:3020/admin";
export const API_PATHS = {
  Apiurl:  "http://192.168.1.9:3020",
    API_BASE_URL,
    login: "/login",
    forgotpassword:"/forgetpassword",
    updatepassword:"/reset-password"
  
};