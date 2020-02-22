import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TypoGraphy from '@material-ui/core/Typography';
import './Summary.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import Home from '../../screens/home/Home';
import {Link} from 'react-router-dom';

const styles = theme => ({
    close: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4,
    },
    success: {
      color: green[600],
    }
  });

class Summary extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            coupon: "",
            referenceCode: "",
            totalPrice: 0            
        }
    }

    componentDidMount () {
        this.setState({totalPrice: this.props.location.totalPrice})
    }

    couponChangeHandler = event => {
        this.setState({coupon: event.target.value});
    }

    confirmBookingHandler = () => {


        let that = this;
        let bookingData = JSON.stringify({
            "customerUuid": sessionStorage.getItem('uuid'),
            "bookingRequest": {
              "coupon_code": this.state.coupon,
              "show_id": this.props.location.bookingSummary.showId,
              "tickets": [
                this.props.location.bookingSummary.tickets.toString()
              ]
            }
          })

        let xhrBookShow = new XMLHttpRequest();

        xhrBookShow.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText);
                that.setState({referenceCode: JSON.parse(this.responseText).reference_number})
            }
        })

        xhrBookShow.open("POST", this.props.baseUrl+"bookings");
        xhrBookShow.setRequestHeader("Content-Type", "application/json");
        xhrBookShow.setRequestHeader("authorization", "Bearer "+sessionStorage.getItem("access-token"));
        xhrBookShow.setRequestHeader("Cache-Control", "no-cache");
        xhrBookShow.send(bookingData);

        this.setState({ open: true });
    }

    snackBarCloseHandler = () => {
        this.props.history.push('/');
    }

    applyCouponHandler = () => {
        
        let that = this;
        let couponData = null;
        let xhrCoupon = new XMLHttpRequest();
        let totalPrice = this.state.totalPrice;

        xhrCoupon.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                let discount = (  totalPrice * parseInt(JSON.parse(this.responseText).value) / 100 );                
                that.setState({totalPrice: totalPrice - discount});
            }
        })

        xhrCoupon.open("GET",this.props.baseUrl+"coupons/"+this.state.coupon);
        xhrCoupon.setRequestHeader("Cache-Control", "no-cache");
        xhrCoupon.setRequestHeader("authorization", "Bearer "+sessionStorage.getItem("access-token"));        
        xhrCoupon.send(couponData);
    }

    render() {

        const { classes } = this.props;

        return(
            <div>
                <Header />
                <div className="confirmation marginTop16">
                    <TypoGraphy className="back">
                        <Link to={'/movie/'+this.props.match.params.id}>
                            &#60; Back to Movie Details
                        </Link>
                    </TypoGraphy>
                    <Card className="cardStyle">
                        <CardContent>
                            <TypoGraphy variant="headline" component="h2">
                                SUMMARY
                            </TypoGraphy><br/>
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                <TypoGraphy>
                                    Location:
                                </TypoGraphy>
                                </div>
                                <div>
                                <TypoGraphy>
                                    {this.props.location.bookingSummary.location}
                                </TypoGraphy>
                                </div>
                            </div> <br/>

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                <TypoGraphy>
                                    Language:
                                </TypoGraphy>
                                </div>
                                <div>
                                <TypoGraphy>
                                    {this.props.location.bookingSummary.language}
                                </TypoGraphy>
                                </div>
                            </div> <br/>
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                <TypoGraphy>
                                    Show Date:
                                </TypoGraphy>
                                </div>
                                <div>
                                <TypoGraphy>
                                    {this.props.location.bookingSummary.showDate}
                                </TypoGraphy>
                                </div>
                            </div> <br/>                            
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                <TypoGraphy>
                                    Tickets:
                                </TypoGraphy>
                                </div>
                                <div>
                                <TypoGraphy>
                                    {this.props.location.bookingSummary.tickets.join(', ')}
                                </TypoGraphy>
                                </div>
                            </div> <br/>
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                <TypoGraphy>
                                    Unit Price:
                                </TypoGraphy>
                                </div>
                                <div>
                                <TypoGraphy>
                                    {this.props.location.bookingSummary.unitPrice}
                                </TypoGraphy>
                                </div>
                            </div> <br/>
                            <div className="coupon-container">
                                <div>
                                <FormControl className="formControl">
                                    <InputLabel htmlFor="coupon">Coupon Code</InputLabel>
                                    <Input id="coupon" onChange={this.couponChangeHandler} />                        
                                    </FormControl>
                                </div>
                                <div className="marginApply">
                                    <Button variant="contained" color="primary"
                                    onClick={this.applyCouponHandler}>APPLY</Button>
                                </div>
                            </div> <br/><br/>
                                
                             <div className="coupon-container">
                                 <div className="confirmLeft">
                                    <TypoGraphy>
                                        <span className="bold">Total Price:</span> 
                                    </TypoGraphy>
                                 </div>
                                 <div>
                                    {this.state.totalPrice}
                                 </div>
                            </div>  <br/>                             
                            
                            <Button variant="contained" color="primary" onClick={this.confirmBookingHandler}>
                                CONFIRM BOOKING</Button> 
                    

                        </CardContent>
                    </Card>
                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    className="snackbar"
                    open={this.state.open}
                    onClose={this.snackBarCloseHandler}
                    message={
                        <span id="client-snackbar" className={classes.success}>
                        <div className="confirm"><div><CheckCircleIcon /></div><div className="message"> Booking Confirmed!
                    Your booking reference number is {this.state.referenceCode}</div></div>
                        </span>
                    }
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.snackBarCloseHandler}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Summary);