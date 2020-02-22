import React , {Component} from 'react';
import Header from '../../common/header/Header';
import './Details.css';
import { Typography } from '@material-ui/core';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {Link} from 'react-router-dom';

class Details extends Component {

    constructor() {
        super();
        this.state= {
            movies: {
                genres: [],
                trailer_url: "",
                artists: []
            },
            starIcons: [
                {
                   id: 1,
                   stateId: "star1",
                   color: "black"
                },
                {
                   id: 2,
                   stateId: "star2",
                   color: "black"
                },
                {
                   id: 3,
                   stateId: "star3",
                   color: "black"
                },
                {
                   id: 4,
                   stateId: "star4",
                   color: "black"
                },
                {
                   id: 5,
                   stateId: "star5",
                   color: "black"
                }
             ]
        }
    }

    componentWillMount() {
       //Get the movie details

        
        let that = this;
        let movieData = null;
        let xhrGetMovie = new XMLHttpRequest();
        xhrGetMovie.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {            
                that.setState({movies: JSON.parse(this.responseText)});                
            }
        })

        xhrGetMovie.open("GET", this.props.baseUrl+"movies/"+this.props.match.params.id);
        xhrGetMovie.setRequestHeader("Cache-Control", "no-cache");
        xhrGetMovie.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhrGetMovie.send(movieData);


    }

    artistClickHandler = (wikiLink) => {
        window.location = wikiLink;
    }

    starClickHandler = (starId) => {
        let starIconsList = [];
        for(let star of this.state.starIcons) {
            let starNode = star;
            if(star.id <= starId) {
                starNode.color = "yellow";
            }
            else {
                starNode.color = "black";
            }
            starIconsList.push(starNode);
        }
        this.setState({starIcons : starIconsList});
    }

    render() {
        let movie = this.state.movies;
        const opts = {
            height: '300',
            width: '700',
            playerVars: {
                autoplay: 1
            }
        }
        return(<div className="details">
            <Header id={this.props.match.params.id} showBookShowButton = "true" />
            <div className="back">
                <Typography>
                  <Link to="/">&#60; Back to home</Link>  
                </Typography>
            </div>
            <div className="flex-containerDetails">
                <div className="leftDetails">
                    <img src={movie.poster_url} alt={movie.title} />
                </div>
                <div className="middleDetails">
                    <div>
                        <Typography variant="headline" component="h2">{movie.title} </Typography>
                    </div>
                    <br/>
                    <div>
                        <Typography><span className="bold">Genre: </span> {movie.genres.join(',')}
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Duration: </span> {movie.duration}
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Release Date: </span> {new Date(movie.release_date).toDateString()}
                        </Typography>
                    </div>
                    <div className="marginTop16">
                        <Typography><span className="bold">Plot: </span> <a href={movie.wiki_url}>(Wiki Link)</a>
                         {movie.storyline}  
                        </Typography>
                    </div>
                    <div className="trailerContainer">
                        <Typography><span className="bold">Trailer: </span></Typography>
                        <YouTube 
                        videoId={movie.trailer_url.split("?v=")[1]}
                        opts = {opts}
                        onReady ={this._onReady}
                        />
                    </div>
                </div>
                <div className="rightDetails">
                    <Typography><span className="bold">Rate this movie:</span></Typography>
                    {this.state.starIcons.map(star => (
                        <StarBorderIcon className={star.color} key={"star"+star.id} 
                        onClick={() => {this.starClickHandler(star.id)}} 
                        />
                    ))}
                        <div className="bold marginBottom16 marginTop16">
                            <Typography>
                                <span className="bold">Artists:</span>
                            </Typography>
                        </div>
                    <div className="paddingRight">
                        <GridList cellHeight={175} cols={2}>
                            {movie.artists != null && movie.artists.map(artist => (                            
                                <GridListTile key={artist.id} className="gridTile" onClick={() => {this.artistClickHandler(artist.wiki_url)}}> 
                                    <img src={artist.profile_url} alt={artist.first_name+" "+artist.last_name} />  
                                    <GridListTileBar
                                    title={artist.first_name+" "+artist.last_name} 
                                    />          
                                </GridListTile>                            
                            ))}
                        </GridList>
                    </div>    
                    
                </div>


            </div>
        </div>);
    }
}

export default Details;