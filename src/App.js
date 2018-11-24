import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const API_URL = './next.json';
// const API_URL = 'https://s3-ap-southeast-2.amazonaws.com/bet-easy-code-challenge/next-to-jump';

class App extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            isLoading: false,
            results: [],
            typeFilter: 'All',
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        this.getResults();
        this.interval = setInterval(() => this.getResults(), 3000);

    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onClickFilter(val) {
        this.setState({typeFilter: val});
    }

    render() {
        const { error, isLoading, typeFilter, results } = this.state;
        if(isLoading) {
            return <p>Loading...</p>;
        }

        const filteredResults = typeFilter === 'All' ?
            results :
            results.filter( row => row.EventTypeDesc === typeFilter);

        const displayResults = filteredResults.map( (row, i) =>
                <div className="bodyRow" key={i}>
                    <span className="resultItem col-xs-2">
                        <img src={`${row.EventTypeDesc}.png`} alt={`${row.EventTypeDesc}`}/>
                    </span>
                    <span className="resultItem col-xs-5">
                        {row.Venue.Venue}<br />
                        Race {row.RaceNumber}
                    </span>
                    <span className="resultItem startTime col-xs-5">
                        {
                            moment(row.AdvertisedStartTime)
                            .format("YYYY/MM/DD HH:mm").toString()
                        }
                    </span>
                </div>
            )

        return (
            <div className="App">
                <header className="App-header">
                    <a href="https://www.beteasy.com.au">
                        <img src="logo.png" alt="logo" />
                    </a>
                </header>
                <div className="body">
                    <div className="jumpCta">
                        Next to Jump
                    </div>
                    <div className="buttonRow">
                        <div className="btnFilter" onClick={() => this.onClickFilter('All')}>All</div>
                        <div className="btnFilter" onClick={() => this.onClickFilter('Thoroughbred')}>
                            <img src="Thoroughbred.png" alt='Thoroughbred' />
                        </div>
                        <div className="btnFilter" onClick={() => this.onClickFilter('Greyhounds')}>         <img src="Greyhounds.png" alt='Greyhounds'/>
                        </div>
                        <div className="btnFilter" onClick={() => this.onClickFilter('Trots')}>
                            <img src="Trots.png" alt = 'Greyhounds'/>
                        </div>
                    </div>
                    <div>
                        { error ? 'Sorry, Please try again' : displayResults}
                    </div>
                </div>
            </div>
        );
    }

    getResults() {
        axios
            .get(API_URL)
            .then(response => {
                this.setState({
                    isLoading: false,
                    results: response.data.result
                })
            })
            .catch(error => {
                this.setState({
                    error,
                    isLoading: false
                })
            })
    }
}

export default App;
