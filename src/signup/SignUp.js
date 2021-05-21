import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import "./style.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const SignUp = ({ history }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [address, setaddress] = useState("");


  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);
  const emailTakens = ["test@gmail.com", "ashu2001@gmail.com"];

  //validation schema
  const ValidationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .min(5, "*Too Short!")
      .max(50, "*Too Long!")
      .required("*Name is required"),

  

    password: Yup.string()
      .trim()
      .required("*Password is required.")
      .min(8, "*Password is too short - should be 8 chars minimum.")
      .matches(/^(?=.*[0-9])/, "*Password must contain a number."),

    confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password".trim())], "Password should match")
      .required("*Password is required."),


    address: Yup.string()
      .trim()
      .min(10, "Too Short!")
      .max(50, "Too Long!")
      .required("*Address is required"),



    email: Yup.string()
      .trim()
      .lowercase()
      .email("*Must be a valid email address")
      .notOneOf(emailTakens, "*Email already taken")
      .required("*Email is required"),
  });
 
  //on handle
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {  email, password,  address, username },
        config
      );
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("username", username);
      history.push("/");
    } catch (error) {

      setError(error.response.data.error);
     
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  //removing confirmPassword

  return (
    <div>
    <Formik
      initialValues={{
        // fullname: "",
        // profession: "",
        // number: "",
        // email: "",
        // password: "",
        confirmPassword: "",
        about: "",
        // age: "",
        // address: "",
        city: "",
        state: "",
        zip: "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={HandleSubmit}
    >
      {({
        values,
        errors,
        touched,
        // handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        //sign up form
        <Paper className="sign-in-form" elevation={3}>
   
          {/* sign heading */}
          <h1 className="text-center pb-5 sign-in-heading" style={{fontFamily: 'Cursive'}}>SIGN UP</h1>
          <form onSubmit={HandleSubmit} className="row g-3">
            {/* full name */}
            <Grid container direction = "column">
              {/* <label htmlFor="fullname" className="form-label">
                User Name
              </label> */}
              <TextField
                type="text"
                
                color="secondary"
                required
                label="Username"
                name="username"
                onChange={(e) => setusername(e.target.value)}
                id="username"
                onBlur={handleBlur}
                value={username}
                className="form-control"
              />
              {/* <Error touched={touched.fullname} message={errors.fullname} /> */}
           

            {/* profession */}


            {/* email */}
          
              {/* <label htmlFor="email" className="form-label">
                Email ID
              </label> */}
              <TextField
                type="text"
                required
                color="secondary"
                label="Email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onBlur={handleBlur}
                className="form-control"
              />
              {/* <Error touched={touched.email} message={errors.email} /> */}
          

            {/* password */}
         
              {/* <label htmlFor="password" className="form-label">
                Password
              </label> */}
              <TextField
              required
              label="Password"
                type="password"
                name="password"
                color="secondary"
                id="password"
                onChange={(e) => setpassword(e.target.value)}
                onBlur={handleBlur}
                value={password}
                className="form-control"
              />
              {/* <Error touched={touched.password} message={errors.password} /> */}
        
              {/* <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label> */}
              {/* <TextField
              // required
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                color="secondary"
                label="Confirm Password"
                onChange={(e) => setConfirmpassword(e.target.value)}
                onBlur={handleBlur}
                value={values.confirmPassword}
                className="form-control"
              /> */}
              {/* <Error
                touched={touched.confirmPassword}
                message={errors.confirmPassword}
              /> */}
          
            {/* about */}
           

            {/* address */}
   
              {/* <label htmlFor="Address" className="form-label">
                Full Address
              </label> */}
              <TextField
                type="text"
                required
                label="Address"
                color="secondary"
                className="form-control"
                onChange={(e) => setaddress(e.target.value)}
                onBlur={handleBlur}
                value={address}
                id="address"
                placeholder="Full Address ..."
              />
              {/* <Error touched={touched.address} message={errors.address} /> */}
         

          </Grid>
              <button
                type="submit"
                className="btn btn-primary sign-in-button"
                disabled={isSubmitting}
              >
                Sign in
              </button>
     
          </form>
        </Paper>
      )}
    </Formik>
    <div>
      
    </div>
    </div>
  );
};

export default SignUp;
