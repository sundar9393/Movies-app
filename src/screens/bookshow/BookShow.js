import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import TypoGraphy from '@material-ui/core/Typography';
import Home from '../../screens/home/Home';
import './BookShow.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import language from '../../common/language';
import location from '../../common/location';
import showDate from '../../common/showDate';
import showTime from '../../common/showTime';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Summary from '../../screens/summary/Summary';


class BookShow extends Component {

    constructor() {
        super();
        this.state = {
            location: "",
            locationRequired: "dispNone",
            language: "",
            languageRequired: "dispNone",
            date: "",
            dateRequired: "dispNone",
            time: "",
            timeRequired: "dispNone",
            tickets: 0,
            ticketsRequired: "dispNone",
            availableTickets: 100,
            unitPrice: 500

        }
    }

    backToDetailsHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }

    locationChangeHandler = (event) => {
        this.setState({location: event.target.value});
    }

    languageChangeHandler = (event) => {
        this.setState({language: event.target.value});
    }

    showDateChangeHandler = (event) => {
        this.setState({date: event.target.value});
    }

    showTimeChangeHandler = (event) => {
        this.setState({time: event.target.value});
    }

    ticketChangeHandler = (event) => {
        this.setState({tickets: event.target.value});
    }

    bookShowButtonHandler = () => {
        this.state.location === "" ? this.setState({locationRequired: "dispBlock"}) :
        this.setState({locationRequired: "dispNone"});
        this.state.language === "" ? this.setState({languageRequired: "dispBlock"}) :
        this.setState({languageRequired: "dispNone"});
        this.state.date === "" ? this.setState({dateRequired: "dispBlock"}) :
        this.setState({dateRequired: "dispNone"});
        this.state.time === "" ? this.setState({timeRequired: "dispBlock"}) :
        this.setState({timeRequired: "dispNone"});
        this.state.tickets === "0" || this.state.tickets === 0 || this.state.tickets === ""  ? this.setState({ticketsRequired: "dispBlock"}) :
        this.setState({ticketsRequired: "dispNone"});

        ReactDOM.render(<Summary location={this.state.location} language={this.state.language} 
            showDate={this.state.date} showTime={this.state.time} tickets={this.state.tickets}
            unitPrice={this.state.unitPrice} totalPrice={this.state.unitPrice * this.state.tickets} 
        />, document.getElementById('root'));

    }

    

    render() {
        return (
            <div>
                <Header />
                <div className="bookShow">
                    <TypoGraphy className="back" onClick={this.backToDetailsHandler}>
                        &#60; Back to Movie Details
                    </TypoGraphy>
                    <Card className="cardStyle">
                        <CardContent>
                            <TypoGraphy variant="headline" component="h2">BOOK SHOW</TypoGraphy><br />
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="location">Choose Location: </InputLabel>
                                <Select
                                input={<Input id="location" />}
                                value={this.state.location}
                                onChange={this.locationChangeHandler}>
                                    {location.map(loc => (
                                        <MenuItem key={"loc"+loc.id} value={loc.location}>
                                            {loc.location}
                                        </MenuItem>
                                    ))}

                                </Select>
                                <FormHelperText className={this.state.locationRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="language">Choose language:</InputLabel>
                                <Select
                                input={<Input id="location" />}
                                value={this.state.language}
                                onChange={this.languageChangeHandler}
                                >
                                    {language.map(lang => (
                                        <MenuItem key={"lang"+lang.id} value={lang.language}>
                                            {lang.language}
                                        </MenuItem>
                                    ))}

                                </Select>
                                <FormHelperText className={this.state.languageRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>

                            </FormControl>
                            <FormControl className="formControl">
                                <InputLabel htmlFor="showDate">Choose Show Date:</InputLabel>
                                <Select
                                input={<Input id="showDate" />}
                                value={this.state.date}
                                onChange={this.showDateChangeHandler}
                                >
                                    {showDate.map(date => (
                                        <MenuItem id={"date"+date.id} value={date.showDate}>
                                            {date.showDate}
                                        </MenuItem>
                                    ))}

                                </Select>
                                <FormHelperText className={this.state.dateRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>

                            <FormControl className="formControl">
                                <InputLabel htmlFor="showTime">Choose Show Time:</InputLabel>
                                <Select
                                input={<Input id="showTime" />}
                                value={this.state.time}
                                onChange={this.showTimeChangeHandler}
                                >
                                    {showTime.map(time => (
                                        <MenuItem key={"time"+time.id} value={time.showTime}>
                                            {time.showTime}
                                        </MenuItem>
                                    ))}

                                </Select>
                                <FormHelperText className={this.state.timeRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>

                            </FormControl>

                            <FormControl className="formControl">
                                <InputLabel htmlFor="tickets">Tickets( {this.state.availableTickets} available )</InputLabel>
                                <Input id="tickets" required value={this.state.tickets !== 0 ? this.state.tickets:""} 
                                onChange={this.ticketChangeHandler} />
                                <FormHelperText className={this.state.ticketsRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl><br/><br/>
                            <TypoGraphy>
                                Unit Price: Rs. {this.state.unitPrice}
                            </TypoGraphy><br/>
                            <TypoGraphy>
                                Total Price: Rs. {this.state.unitPrice * this.state.tickets}
                            </TypoGraphy><br/><br/>
                            <Button variant="contained" onClick={this.bookShowButtonHandler} color="primary">
                                BOOK SHOW
                            </Button>

                            
                            
                        </CardContent>
                    </Card>
                </div>

            </div>
        )
    }
}

export default BookShow;