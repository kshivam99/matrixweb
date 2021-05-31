const catchErrors = error => {
  let errorMsg;
  if (error.response) {
  
    // If the request was made and the server not responded with a status code in the range of 2xx

    errorMsg = error.response.data;
    console.error(errorMsg);

  } else if (error.request) {

    // if no response was recevied from server

    errorMsg = error.request;
    console.error(errorMsg);

  } else {

    // if something broke while making the request

    errorMsg = error.message;
    console.error(errorMsg);
    
  }
  return errorMsg;
};

export default catchErrors;
