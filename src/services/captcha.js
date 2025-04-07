import axios from 'axios';

export const captcha = async (token, version = "v2") => {
  const secretKeyV2 = '6Lc7Xw0rAAAAANj-npUrjHi1O-O1IiWj74owC-gX';
  const secretKeyV3 = '6Le7Zw0rAAAAAMtaI_U4VKAzijTvjGIiQCcxsaEe'; 
  const secretKey = version === "v3" ? secretKeyV3 : secretKeyV2;

  const url = `https://www.google.com/recaptcha/api/siteverify`;
  const corsUrl = `${url}`;

  try {
    const response = await axios.post(corsUrl, null, {
      params: {
        secret: secretKey,
        response: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error during reCAPTCHA verification:", error);
    throw new Error("reCAPTCHA verification failed");
  }
};
