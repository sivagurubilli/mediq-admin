
export const API_BASE_URL = 
 process.env.API_BASE_URL || "http://localhost:3020/admin";
export const API_PATHS = {
  Apiurl:  "http://localhost:3020",
    API_BASE_URL,
    login: "/login",
    forgotpassword:"/forgetpassword",
    updatepassword:"/reset-password"
  
};