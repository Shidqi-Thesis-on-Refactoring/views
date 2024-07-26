/**
 * This function to Setup config/headers and token
 * it gets the token from our main state and attach it to the header
 */
export const tokenConfig = (getState = null, optionalParams = null, headers="application/json") => {
  // Get token from localstorage
  const token = getState ? getState().userrr.token : null;
  console.log(getState);

  const config = {
    headers: {
      "Content-type": headers
    },
    params: {}
  };

  // If token, add to headers
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  if (optionalParams) {
    config.params = optionalParams;
  }

  return config;
};
