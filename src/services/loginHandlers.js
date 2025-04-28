import { showToast } from '@utils/toast';
import api from '../api/axiosInstance';

export const handleLoginSubmit = async (values, navigate) => {
  const payload = {
    user: {
      phone: values.phone.replace(/\D/g, ''),
      password: values.password
    }
  };
  console.log('login payload', payload);

  try {
    const response = await api.post('/auth/login', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200 || response.status === 201) {
      showToast('Успешный вход', 'success');

      const { access_token, refresh_token, expires_in, user } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_at', Date.now() + expires_in * 1000);
      localStorage.setItem('user', JSON.stringify(user));

      // navigate("/");
    } else {
      showToast('Неверные данные для входа', 'error');
      console.warn('Ошибка входа', response.data);
    }
  } catch (error) {
    console.error('Ошибка при входе', error);
    if (error.response?.status === 401) {
      showToast('Неправильный логин или пароль', 'error');
    } else {
      showToast('Ошибка сервера, попробуйте позже', 'error');
    }
  }
};
