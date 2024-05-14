import * as Yup from 'yup';

export const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters long'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  image: Yup.mixed()
  .required('An image is required')
    // .test(
    //   'fileSize',
    //   'The file is too large',
    //   value => value && value.size <= 1024 * 1024 // 1MB
    // )
    .test(
      'fileType',
      'Unsupported File Format',
      value => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
    ),
});
