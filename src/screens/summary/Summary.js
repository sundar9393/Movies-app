import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TypoGraphy from '@material-ui/core/Typography';
import './Summary.css';
import BookShow from '../../screens/bookshow/BookShow';
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
            open: false
            
        }
    }

    backToBookShowHandler = () => {
        ReactDOM.render(<BookShow />, document.getElementById('root'));            
    }

    confirmBookingHandler = () => {
        this.setState({ open: true });
      }

      snackBarCloseHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
      }

    render() {

        const { classes } = this.props;

        return(
            <div>
                <Header />
                <div className="confirmation marginTop16">
                    <TypoGraphy className="back" onClick={this.backToBookShowHandler}>
                        &#60; Back to Movie Details
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
                                    {this.props.location}
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
                                    {this.props.language}
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
                                    {this.props.showDate}
                                </TypoGraphy>
                                </div>
                            </div> <br/>
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                <TypoGraphy>
                                    Show Time:
                                </TypoGraphy>
                                </div>
                                <div>
                                <TypoGraphy>
                                    {this.props.showTime}
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
                                    {this.props.tickets}
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
                                    {this.props.unitPrice}
                                </TypoGraphy>
                                </div>
                            </div> <br/>
                            <div className="coupon-container">
                                <div>
                                <FormControl className="formControl">
                                    <InputLabel htmlFor="coupon">Coupon Code</InputLabel>
                                    <Input id="coupon" />                        
                                    </FormControl>
                                </div>
                                <div className="marginApply">
                                    <Button variant="contained" color="primary">APPLY</Button>
                                </div>
                            </div> <br/><br/>
                                
                             <div className="coupon-container">
                                 <div className="confirmLeft">
                                    <TypoGraphy>
                                        <span className="bold">Total Price:</span> 
                                    </TypoGraphy>
                                 </div>
                                 <div>
                                    {this.props.totalPrice}
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
                        <div className="confirm"><div><CheckCircleIcon /></div><div className="message"> Booking Confirmed!</div></div>
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