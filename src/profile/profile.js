import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {useState, useEffect} from 'react';
import { FiEdit} from 'react-icons/fi';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



const Profile =({history, match}) => {
    const [error, setError] = useState("");
    const [username, setusername] = useState("");

    const [email, setemail] = useState("");

    const [address, setaddress] = useState("");
  
    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
          history.push("/");
        }
    
        const fetchPrivateData = async () => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
          
          
    
          try {
    
            //  const { data } = await axios.get("/api/private/", config);
            // console.log(localStorage.getItem("email"))
            const { data } = await axios.get(`/api/private/profile/${match.params.username}`, config);
            console.log(data);
           
            setusername(data.user.username)
            setemail(data.user.email)
            console.log(data)
            setaddress(data.user.address)
           
          } catch (error) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("username");
            setError("not authorized");
          }
        };
        fetchPrivateData();
      }, [history]);
      const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        // const { history } = props;
        history.push("/");
        //console.log(props);
      };
      const classes = useStyles();

  return (
      <div style={{alignContent: 'center'}}>
      <Paper style={{padding: '5rem'}}>
          <div style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
      <Button variant="contained" color="secondary"  onClick={logoutHandler}>
        Sign-Out
      </Button>
      </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
            <TableRow >
              <TableCell component="th" scope="row">
            Information
              </TableCell>
              <TableCell align="right">{username}</TableCell>
              <TableCell align="right">{email}</TableCell>
              <TableCell align="right">{address}</TableCell>
              <TableCell align="right"><FiEdit/></TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </div>
  );
}
export default  Profile;