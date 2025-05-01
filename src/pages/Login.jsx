import BgGradient from '@components/BgGradient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsQuestionSquareFill } from 'react-icons/bs';
import GoogleAuth from '@components/GoogleAuth';
import { loginSchema } from '@validate/loginSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { formatPhoneNumber } from '@validate/registerSchema';
import AnimatedError from '@components/AnimatedError';
import { handleLoginSubmit } from '@services/loginHandlers';
import translate from '@utils/translate';
import HelpButton from '@components/HelpButton';

export default function Login() {
  // const Input = ({ type, placeholder }) => (
  //   <input
  //     className="input-styles"
  //     type={type}
  //     placeholder={placeholder}
  //     required
  //   />
  // );
  return (
    <BgGradient>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="container flex flex-row gap justify-between w-[75%] items-center"
      >
        <Link
          to={'/'}
          className="flex items-center justify-center hover:scale-110 transition-all"
        >
          <h1 className="main-title flex text-7xl font-bold items-center justify-center text-shadow-[-1px_3px_6px]">
            {translate('key_app_name')}
          </h1>
        </Link>
        <section className="max-w-[650px] container bg-white p-16 rounded-2xl border-b-primary border-b-8 z-999">
          <h2 className="text-3xl pb-10">{translate('key_login_title')}</h2>
          <Formik
            initialValues={{ phone: '', password: '', remember: false }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              handleLoginSubmit(values);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form className="grid gap-6">
                <label className="col-span-2">
                  <Field
                    name="phone"
                    type="tel"
                    placeholder={translate('key_phone')}
                    className="input-styles"
                    onChange={(e) => {
                      const phoneValue = e.target.value;
                      const formattedPhone = formatPhoneNumber(phoneValue);
                      setFieldValue('phone', formattedPhone);
                    }}
                    value={values.phone}
                  />
                  <ErrorMessage name="phone">
                    {(msg) => <AnimatedError msg={msg} variant="login" />}
                  </ErrorMessage>
                </label>

                <label className="col-span-2">
                  <Field
                    name="password"
                    type="password"
                    placeholder={translate('key_password')}
                    className="input-styles "
                  />
                  <ErrorMessage name="password">
                    {(msg) => <AnimatedError msg={msg} variant="login" />}
                  </ErrorMessage>
                </label>
                <label className="flex items-center space-x-2 justify-center col-span-2">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="form-checkbox hidden"
                  />
                  <span className="checkbox-custom"></span>
                  <span>
                    {translate('key_remember_me')}{' '}
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline text-center"
                    ></Link>
                  </span>
                </label>

                <button
                  className="button-styles col-span-2 mb-4 w-full"
                  type="submit"
                >
                  {translate('key_enter')}
                </button>
              </Form>
            )}
          </Formik>
          <GoogleAuth />
          <div className="flex justify-evenly col-span-2 mt-4">
            <Link
              className="text-primary hover:underline"
              to="/forgot-password"
            >
              {translate('key_forgot_password')}
            </Link>
            <Link className="text-primary hover:underline" to="/register">
              {translate('key_no_account')}
            </Link>
          </div>
        </section>
      </motion.div>
      <HelpButton />
    </BgGradient>
  );
}
