import * as Yup from 'yup';

export const hasEmail = (text) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text);
export const hasSpecialChar = (text) => /[!@#$%^&*()?><{}/,.;'"|]/.test(text);
export const hasAlpha = (text) => /^[A-Za-z]/.test(text);
export const hasMinLength = (text) => text.length >= 2;

export const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[A-Za-z]/, {message: 'Must be a valid name'})
        .required('Required'),
    email: Yup.string()
        .email('Invalid Email')
        .required('Required'),
    role: Yup.string()
        .matches(/^[A-Za-z]/, {message: 'Must be a valid role'})
        .required('Required')
});