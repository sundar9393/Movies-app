import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }

});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            upcomingMovies: [{}],
            releasedMovies: [{}],
            movieName: "",
            genreList: [{}],
            artistList: [{}],
            genres: [],
            artists: [],
            releaseStartDate: "",
            releaseEndDate: ""
    
        }

    }

    movieNameChangeHandler = (e) => {
        this.setState({ movieName: e.target.value });
    }

    genreSelectHandler = (e) => {
        this.setState({genres: e.target.value});
    }

    artistSelectHandler = (e) => {
        this.setState({artists: e.target.value})
    }

    movieClickHandler = (movieId) => {  
        this.props.history.push('/movie/'+movieId);
    }

    releaseDateStartHandler = event => {
        this.setState({releaseStartDate: event.target.value});
    }

    releaseDateEndHandler = event => {
        this.setState({releaseEndDate: event.target.value});
    }

    filterApplyHandler = () => {
        let queryString = "?status=RELEASED";

        if(this.state.movieName !== "") {
            queryString += "&title="+this.state.movieName;            
        }
        if(this.state.genres.length > 0) {
            queryString += "&genres="+this.state.genres.toString();
        }
        if(this.state.artists.length > 0) {
            queryString += "&artist_name="+this.state.artists.toString();
        }
        if(this.state.releaseStartDate !== "") {
            queryString += "&start_date="+this.state.releaseStartDate;
        }
        if(this.state.releaseEndDate !== "") {
            queryString += "&end_date="+this.state.releaseEndDate;
        }

        console.log(queryString);

        let that = this;
        let filterData = null;
        let xhrFilter = new XMLHttpRequest();
        xhrFilter.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                that.setState({releasedMovies: JSON.parse(this.responseText).movies});
            }
        })

        xhrFilter.open("GET", this.props.baseUrl+"movies"+encodeURI(queryString));
        xhrFilter.setRequestHeader("Cache-Control", "no-cache");
        xhrFilter.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhrFilter.send(filterData);
    }

    componentWillMount() {
        
        let that = this;

        //Upcoming movies call

        let data = null;
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                that.setState({upcomingMovies: JSON.parse(xhr.responseText).movies});                
            }
        })

        xhr.open("GET", this.props.baseUrl+"movies?status=PUBLISHED");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.send(data);

        //Released movies call

        let xhr1 = new XMLHttpRequest();
        xhr1.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(JSON.parse(xhr1.responseText));
                that.setState({releasedMovies: JSON.parse(xhr1.responseText).movies});
            }
        })

        xhr1.open("GET", this.props.baseUrl+"movies?status=RELEASED");
        xhr1.setRequestHeader("Cache-Control", "no-cache");
        xhr1.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr1.send();

        //Genres call

        let xhrGenres = new XMLHttpRequest();
        let genresData = null;
        xhrGenres.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                that.setState({genreList: JSON.parse(this.responseText).genres});
            }
        })

        xhrGenres.open("GET", this.props.baseUrl+"genres");
        xhrGenres.setRequestHeader("Cache-Control", "no-cache");
        xhrGenres.send(genresData);

        //Artists call

        let xhrArtists = new XMLHttpRequest();
        let artistsData = null;
        xhrArtists.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                that.setState({artistList: JSON.parse(this.responseText).artists});
            }
        })

        xhrArtists.open("GET", this.props.baseUrl+"artists");
        xhrArtists.setRequestHeader("Cache-Control", "no-cache");
        xhrArtists.send(artistsData);



    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} />
                <div className={classes.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
                </div>
                   <GridList cols={5} className={classes.gridListUpcomingMovies}>
                    {this.state.upcomingMovies.map(movie => (
                        <GridListTile key={"upcoming"+movie.id}>
                            <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>
                <div className="flex-container">
                    <div className="left">
                        <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                            {this.state.releasedMovies.map(movie => (
                                <GridListTile onClick={() => this.movieClickHandler(movie.id)} className="released-movie-grid-item" key={"released" + movie.id}>
                                    <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date: {movie.release_date}</span>}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    <div className="right">
                        <Card>
                            <CardContent>
                            
                                <FormControl className={classes.formControl}>
                                    <Typography className={classes.title} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                    <Input id="movieName" onChange={this.movieNameChangeHandler} />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.genreSelectHandler}>
                                        {this.state.genreList.map(genre => (
                                            <MenuItem key={"genre"+genre.id} value={genre.genre}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.genre) > -1} />
                                                <ListItemText primary={genre.genre} />
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-artist-checkbox">Artists</InputLabel>
                                    <Select
                                    multiple
                                    input={<Input id="select-artist-checkbox" />}
                                    renderValue={selected => selected.join(',')}
                                    value={this.state.artists}
                                    onChange={this.artistSelectHandler}>
                                        <MenuItem value="0">None</MenuItem>
                                        {this.state.artistList.map(artist => (
                                            <MenuItem key={"artist"+artist.id} value={artist.first_name+" "+artist.last_name}>
                                                <Checkbox checked={this.state.artists.indexOf(artist.first_name+" "+artist.last_name) > -1} />
                                                <ListItemText primary={artist.first_name +" "+ artist.last_name}/>
                                            </MenuItem>
                                        ))}


                                    </Select>

                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <TextField
                                    id="releaseDateStart"
                                    label="Release Date Start"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{shrink: true}}
                                    onChange={this.releaseDateStartHandler}
                                    />

                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <TextField 
                                    id="releaseDateEnd"
                                    label="Release Date End"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{shrink: true}}
                                    onChange={this.releaseDateEndHandler}
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <Button variant="contained" color="primary"
                                    onClick={() => this.filterApplyHandler()}>APPLY</Button>            
                                </FormControl>

                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(Home);