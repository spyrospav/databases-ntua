import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

class SignUpEmployee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isPermanent: false,
      EFirst: "",
      ELast: "",
      password: "",
      Salary: "",
    };
  }

  handleChange = field => event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      [field]: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.socket.emit("ADD_EMPLOYEE", this.state)
  }

  render(){
    const classes  = this.props.classes;
    return (
      <div>
      <h2> Add new employee </h2>
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
                onChange={this.handleChange("EFirst")}
                label="First Name"
                margin="normal"
                required
                fullWidth
              >
            </TextField>

            <TextField
                onChange = {this.handleChange("ELast")}
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
                onChange = {this.handleChange("Salary")}
                label="Salary"
                margin="normal"
                required
                fullWidth
              >
            </TextField>
            <FormControlLabel
            checked={!this.state.isPermanent}
            control={<Checkbox
              onClick={()=>this.setState(state => ({...state, isPermanent: !state.isPermanent}))}
              color="primary" />}
            label="Temporary"
            />
            <FormControlLabel
            checked={this.state.isPermanent}
            control={<Checkbox
              onClick={()=>this.setState(state => ({...state, isPermanent: !state.isPermanent}))}
              color="primary" />}
            label="Permament"
            />
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
      </div>
    );
  }
}


export default withStyles(styles)(SignUpEmployee);
