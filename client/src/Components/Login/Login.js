import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import toast from "react-hot-toast";
import { FRONTEND_URL } from '../../utils/utils';
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../../contexts/UserContext";



const validationSchema = Yup.object({
    email: Yup.string()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{3,4}$/,
      "email must be valid email"
    )
    .required("Email is required"),
    password: Yup.string()
    .required("Password is required"),
});

function Login() {

    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(false);
    const {setIsLoggedIn}=useContext(UserContext);

    const handleSubmit = async (values) => {
        try {
            setIsLoading(true);
            console.log(values)
            const response = await axios.post(`${FRONTEND_URL}/login`, values);
            localStorage.setItem("token", JSON.stringify(response.data.jwtToken));
            toast.success(response.data.message,{position:'top-right'});
            setIsLoggedIn(true)
            navigate("/");
          } catch (error) {
            console.log(error);
            toast.error(error.response.data.error.message,{position:'top-right'});
          } finally{
            setIsLoading(false);
          }
    };

    return (
        <div>
            <div className={styles.header}>
                <h3>Login</h3>
            </div>

            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.login}>
                        <p><span>Sign in.</span> Already a User?</p>
                        <p>Email Id</p>
                        <Field type="email" name="email" className={styles.input_box}/>
                        <ErrorMessage name="email" component="div" className={styles.error} />
                        <p>Password</p>
                        <Field type="password" name="password" className={styles.input_box}/>
                        <ErrorMessage name="password" component="div" className={styles.error} />
        
                        <button type="submit">{isLoading ? 'Loading...':'Login'}</button>
                    </Form>
                )}
            </Formik>

            <div className={styles.footer}>
                <div>Dont have an account? </div>
                <div onClick={()=>navigate('/register')} className={styles.footer_register}>Register</div>
            </div>
        </div>
    )
}

export default Login;
