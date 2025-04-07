import api from 'axios';
// ЭТО СЕРВАК!!!!
export const captcha = async (token) => {
  const secretKey = '6Lc7Xw0rAAAAANj-npUrjHi1O-O1IiWj74owC-gX';  

  try {
    const response = await api.post('https://www.google.com/recaptcha/api/siteverify', null, {
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
