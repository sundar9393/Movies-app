import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import BookShow from '../../screens/bookshow/BookShow';
import {Link} from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = (props) => {
    return (
        <Typography component="div" style={{padding: 0, textAlign: "center"}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired 
}


class Header extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: "",
            firstname: "",
            firstnameRequired: "dispNone",
            lastname: "",
            lastnameRequired: "dispNone",
            email: "",
            emailRequired: "dispNone",
            contact: "",
            contactRequired: "dispNone",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }
    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: "",
            firstname: "",
            firstnameRequired: "dispNone",
            lastname: "",
            lastnameRequired: "dispNone",
            email: "",
            emailRequired: "dispNone",
            contact: "",
            contactRequired: "dispNone",
            registrationSuccess: false
        })
    }

    closeModalHandler = () => {
        this.setState({modalIsOpen: false})
    }

    tabChangeHandler = (event, value) => {
        this.setState({value})
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({usernameRequired: "dispBlock"}) :
        this.setState({usernameRequired: "dispNone"});
        this.state.password === "" ? this.setState({passwordRequired: "dispBlock"}) :
        this.setState({passwordRequired: "dispNone"});

        if((this.state.username === "") || (this.state.password === "")) {
            return;
        }

        let that=this;

        let loginData =  null;
        let loginAuthHeader = new Buffer(this.state.username+':'+this.state.password).toString('base64');

        let xhrlogin = new XMLHttpRequest();
        xhrlogin.addEventListener("readystatechange", function() {

            if(this.readyState === 4) {
                
                console.log(JSON.parse(this.responseText));                
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrlogin.getResponseHeader("access-token"));
                that.setState({loggedIn: true});
                that.closeModalHandler();

            }
        })

        xhrlogin.open("POST", this.props.baseUrl+"auth/login");
        xhrlogin.setRequestHeader("authorization", "Basic "+loginAuthHeader);
        xhrlogin.setRequestHeader("Cache-Control", "no-cache");
        xhrlogin.send(loginData);

    }

    registerClickHandler = () => {
        this.state.firstname === "" ? this.setState({firstnameRequired: "dispBlock"}) :
        this.setState({firstnameRequired: "dispNone"});
        this.state.lastname === "" ? this.setState({lastnameRequired: "dispBlock"}) :
        this.setState({lastnameRequired: "dispNone"});
        this.state.email === "" ? this.setState({emailRequired: "dispBlock"}) :
        this.setState({emailRequired: "dispNone"});
        this.state.password === "" ? this.setState({passwordRequired: "dispBlock"}) :
        this.setState({passwordRequired: "dispNone"});
        this.state.contact === "" ? this.setState({contactRequired: "dispBlock"}) :
        this.setState({contactRequired: "dispNone"});

        if((this.state.firstname === "") || (this.state.lastname === "") || (this.state.email === "") || 
        (this.state.password === "") || (this.state.contact === "")) {
            return;
        }

        let that=this;
        let signupData = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.password
          })
        let xhrsignup = new XMLHttpRequest();
        xhrsignup.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(JSON.parse(xhrsignup.responseText));
                that.setState({registrationSuccess: true});
            }
        })

        xhrsignup.open("POST", this.props.baseUrl+"signup");
        xhrsignup.setRequestHeader("Content-Type", "application/json");
        xhrsignup.setRequestHeader("Cache-Control", "no-cache");
        xhrsignup.send(signupData);

    }

    inputUsernameChangeHandler = (e) => {
        this.setState({username: e.target.value});
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value});
    }

    firstnameChangeHandler = (e) => {
        this.setState({firstname: e.target.value});
    }

    lastnameChangeHandler = (e) => {
        this.setState({lastname: e.target.value});
    }

    emailChangeHandler = (e) => {
        this.setState({email: e.target.value});
    }

    contactChangeHandler = (e) => {
        this.setState({contact: e.target.value});
    }

    bookShowHandler = () => {
        ReactDOM.render(<BookShow />, document.getElementById('root'));
    }

    logoutHandler = () => {
            sessionStorage.clear();
            this.setState({loggedIn: false});         
    }

    render() {
        return (
            <div>
                <header className="header">
                    <img src={logo} className="app-logo" alt="logo" />

                    {this.state.loggedIn === true ? 
                    <div className="login-btn">                
                        <Button variant="contained" color="default" onClick={this.logoutHandler}>Logout</Button>
                    </div> :
                    <div className="login-btn">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>Login</Button>    
                    </div>}
                    
                    {this.props.showBookShowButton === "true" && !this.state.loggedIn
                        ? <div className="bookshow-button">
                            <Button variant="contained" color="primary" onClick={this.openModalHandler}>
                                Book Show
                            </Button>
                        </div>
                        : ""
                    }

                    {this.props.showBookShowButton === "true" && this.state.loggedIn
                        ? <div className="bookshow-button">
                            <Link to={"/bookshow/" + this.props.id}>
                                <Button variant="contained" color="primary">
                                    Book Show
                                </Button>
                            </Link>
                        </div>
                        : ""
                        
                    }
                    
                    

                    
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" 
                    onRequestClose={this.closeModalHandler} style={customStyles}>
                        <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                            <Tab label="Login" />
                            <Tab label="Register" />
                        </Tabs>
                        {this.state.value === 0 && 
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username"> Username </InputLabel>
                                <Input id="username" type="text" username={this.state.username} 
                                onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl><br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password"> Password </InputLabel>
                                <Input id="password" type="password" password={this.state.password}
                                onChange={this.inputPasswordChangeHandler}/>
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl> <br /><br />
                            {this.state.loggedIn === true &&
                                <FormControl>
                                       <span>Successfully Logged In!!</span> 
                                </FormControl>} <br/><br/>
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>
                                LOGIN
                            </Button>
                        </TabContainer>
                        }
                        {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname}
                                 onChange={this.firstnameChangeHandler}/>
                                
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>

                            </FormControl><br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname}
                                onChange={this.lastnameChangeHandler} />
                                
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>

                            </FormControl><br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={this.state.email}
                                onChange={this.emailChangeHandler} />
                                
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>

                            </FormControl><br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password}
                                onChange={this.inputPasswordChangeHandler} />
                                
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>

                            </FormControl><br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact</InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact}
                                onChange={this.contactChangeHandler} />
                                
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>

                            </FormControl><br /><br />
                            {this.state.registrationSuccess === true &&
                            <FormControl>
                                <span className="successText">Registration Successful. Please Login!</span>
                            </FormControl>}<br/>
                        
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>
                                REGISTER
                            </Button>

                        </TabContainer>
                        }
                </Modal>
            </div>
        )
    }
}


export default Header;