
export const pagesToShowInitially =2


export const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const passwordregex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/

export const usernameregex =/^[A-Za-z0-9]+$/;
export const nameregex = /^[A-Za-z\s]{2,20}$/;
export const descriptionRegex = /^[A-Za-z0-9\s.,?!'"\-]{3,}$/;
export const videoRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.*[?&]v=)|youtu\.be\/|vimeo\.com\/|dailymotion\.com\/video\/|facebook\.com\/.*\/videos\/|twitter\.com\/.*\/status\/\d+|twitch\.tv\/videos\/\d+)[\w\-._~:\/?#[\]@!$&'()*+,;=.]+$/;
export const phoneNumberRegex = /^[6-9]\d{9}$/;
export const aadhaarNumberRegex = /^\d{12}$/;




export const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert the input string to a Date object
  
    // Get the day, month, and year
    const day = date.getDate().toString().padStart(2, '0');  // Ensure 2 digits for day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear(); // Get the full year
  
    // Return the date in DD/MM/YYYY format
    return `${day}/${month}/${year}`;
  };