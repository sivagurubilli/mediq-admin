
import { API_PATHS } from "../constants/api.constants";
async function  FileUpload(e) {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"));
    const token = user.data.accessToken;
    // Update the FormData with the resized Blob
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };
    let response = await fetch(API_PATHS.fileUpload, requestOptions);
    let data = await response.json();
    return (data?.link);
    // setMessage(data.message);


}

export default FileUpload;