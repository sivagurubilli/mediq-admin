
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const SUPPORTED_FORMATS_Pdf = [
  'application/pdf',
  'image/jpg',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];



export const checkIfFilesAreTooBig = (file) => {
  if(!file){  return false}
    if(file[0] && file[0]?.size){
  return file[0] && file[0]?.size <= MAX_FILE_SIZE;
    }else{
        return file && true 
    }
};

export const checkIfFilesAreCorrectType = (file) => {
  if(!file) {return false}

  if(file[0] && file[0]?.size){
  return file[0] && SUPPORTED_FORMATS.includes(file[0]?.type);
  }else{
    return file && true 
  }
};


export const checkFilesAreCorrecttype = (file) => {
  if(!file) {return false}

  if(file[0] && file[0]?.size){
  return file[0] && SUPPORTED_FORMATS_Pdf.includes(file[0]?.type);
  }else{
    return file && true 
  }
};

export const isfileavailable = (file) => {
  if(!file) {return false}

  if(file[0] && file[0]?.size){
  return file[0] && file[0]?.size >10
  }else if(file?.length ===0){
    return file && false
  }else{
    return file && true 
  } 
}



export const checkFilesAreCorrecttypenotrequire = (file) => {
  if (!file || !file[0] || !file[0].size) return true; // No file uploaded
  return SUPPORTED_FORMATS_Pdf.includes(file[0]?.type);
};

export const checkIfFilesAreTooBignotrequire = (file) => {
  if (!file || !file[0] || !file[0].size) return true; // No file uploaded
  return file[0]?.size <= MAX_FILE_SIZE;
};