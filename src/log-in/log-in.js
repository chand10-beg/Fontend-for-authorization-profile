import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import "./style.css";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },

  LoginButton: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: "5px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    width: "100%",
    padding: "0 30px ",
    // marginTop:'2rem',
    // marginBottom:'2rem',
  },
}));

const LogIn = ({ history }) => {
  const classes = useStyles();



  // const [account, setAccount] = useState({ email :"", password: ""});
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push(`/profile/${localStorage.getItem("username")}`);
    }
  }, [history]);

  //joi schema
  // const  schema = {
  //   email: Joi.string().email().required().label("Email Address"),
  //   password: Joi.string().required().label("Password")
  // };

  //error toast fucntion


  const LoginSubmit = async (e) => {
  
    e.preventDefault();

    // const err = validate();
    // setErrors(err);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
     
      
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("username", data.username)
     history.push(`/profile/${data.username}`);
    } catch (error) {

      console.log(error.response.data.error);
      setTimeout(() => {
        setErrors("");
      }, 5000);
    }
  };



  return (
    <div>
    <Paper className="LoginPaper" elevation={3}>

      <h1 className="text-center pb-4 pt-5" style={{fontFamily: "cursive"}}>LOG IN</h1>
      <form onSubmit={LoginSubmit}>
    <Grid container direction = "column">
          {/* <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label> */}
     
          <TextField
          required 

            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            label="Email"
            // tabIndex={1}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          {errors.email && (
            <div className="alert alert-danger">{errors.email}</div>
          )}
      
     
          <TextField
          required
          label="Password"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            name="password"
            // tabIndex={3}
            className="form-control"
            id="exampleInputPassword1"
          />
          {errors.password && (
            <div className="alert alert-danger">{errors.password}</div>
          )}
</Grid>
<Grid  direction="column" style={{marginTop: '2rem'}}>
        <div className="text-center mt-3 pt-4">
          <Button type="submit" tabIndex={4} className={classes.LoginButton}>
            LOGIN
          </Button>
        </div>
        </Grid>

        <div className = "helpful-link">
    
           
        <Link to="/sign-up" style = {{"marginLeft":".5rem", "textDecoration":"none"}} tabIndex={2}>
              Create a new account!!.
            </Link>
          
       
        </div>
      
      </form>
      
    </Paper>
    <div>
     
    </div>
    </div>
  );
};

export default LogIn;
