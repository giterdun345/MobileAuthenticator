import base64 from "react-native-base64";

// JS FILE BECAUSE BASE64 DOES NOT HAVE TS MODULES
const parseJwt = (token) => {
  if (!token || token?.length === 0) {
    return null;
  }
  const headerPart = sanitizeJson(base64.decode(token?.split(".")[0]));
  const payloadPart = sanitizeJson(base64.decode(token?.split(".")[1]));
  return {
    header: JSON.parse(headerPart),
    payload: JSON.parse(payloadPart),
  };
};
const sanitizeJson = (json) => {
  return json?.replace(/[\u0000]+/g, "");
};

export default parseJwt;
