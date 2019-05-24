import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
// import io from 'socket.io-client';
//
// const socket = io('http://localhost:8000');

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mFirst: "",
      mLast: "",
      street: "",
      streetNum: "",
      postalCode: "",
      MBirthDate: "",
      password: "",
    };
  }

  componentDidMount(){
    // socket.on("SUCCESSFULL_LOGIN",() => {
      // console.log("success");
    // })
  }

  handleChange = field => event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      [field]: event.target.value
    })
    //this.props.handleChange();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.username,this.state.password);
  //   this.props.handleConnect({
  //     username: this.state.username,
  //     password: this.state.password
  //   });

    // socket.emit("LOGIN",{
    //   username: this.state.username,
    //   password: this.state.password
    // });
    // add call to action emitter from this.props
  }

  render(){
    const classes  = this.props.classes;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>

            <TextField
                onChange={this.handleChange("mFirst")}
                label="First Name"
                margin="normal"
                required
                fullWidth
              >
            </TextField>

            <TextField
                onChange = {this.handleChange("mLast")}
                label="Last Name"
                margin="normal"
                required
                fullWidth
              >
            </TextField>

            <TextField
                onChange = {this.handleChange("password")}
                type="password"
                label="Password"
                margin="normal"
                required
                fullWidth
              >
            </TextField>
            <TextField
                onChange = {this.handleChange("street")}
                label="Street"
                margin="normal"
                required
                fullWidth
              >
            </TextField>
            <TextField
                onChange = {this.handleChange("streetNum")}
                label="Street Number"
                margin="normal"
                required
                fullWidth
              >
            </TextField>

            <TextField
                onChange = {this.handleChange("postalCode")}
                label="Birth Date (i.e. 10/5/98)"
                margin="normal"
                required
                fullWidth
              >
            </TextField>

          //  <p> {this.props.message} </p>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}


export default withStyles(styles)(SignUp);
