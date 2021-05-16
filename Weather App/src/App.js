import React, {Component} from 'react';
import './Styles/App.css';
import './Styles/Reset.css';
import './Styles/Mixins.less';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import CurrentWeather from './Components/CurrentWeather';
import EventSelection from './Components/EventSelection';
import Schedule from './Components/Schedule';
import Search from './Components/Search';


export class App extends Component {
    // initializing the state of the application which holds information for the application to use.
    state = {
        suggesteddestinations : [],
        scheduleddestinations : [],
        loaded: false
    }

    componentDidMount = () =>{
        this.grabData()
    }

    // function for selecting the weather for upcoming days 
    getday = (weatherData, start, prev) => {
        for(var i = start; i<=weatherData.list.length; i++){
            if(!weatherData.list[i].dt_txt.includes(prev.dt_txt.split(' ')[0]) 
            && weatherData.list[i].dt_txt.split(' ')[1] === "15:00:00"){
                return [weatherData.list[i], i]
            }
        }
    }

    // sets the state of the component with all of the data fetched from the weather api
    // and suggested destinations from the db.json file 
    grabData = async () =>{
        let suggestionsAPI = "https://my-json-server.typicode.com/dharquissandas/weather_app/suggesteddestinations";
        let suggestionsFetch = await fetch(suggestionsAPI)
        let suggestionData = await suggestionsFetch.json()

        for (let index = 0; index < suggestionData.length; index++){
            let city = suggestionData[index]

            let weatherFetch = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&APPID=5afdbd7139b98ae3f70a76b0dda2b43b`)
            let weatherData = await weatherFetch.json()

            let {main, weather, wind} = weatherData.list[0]
            
            // populate all of the suggestionData values to match the data given from the api
            suggestionData[index].temp = Math.round(main.temp).toString()
            suggestionData[index].desc = weather[0].main
            suggestionData[index].tempmax = Math.round(main.temp_max).toString()
            suggestionData[index].tempmin = Math.round(main.temp_min).toString()
            suggestionData[index].feelslike = Math.round(main.feels_like).toString()
            suggestionData[index].pressure = main.pressure.toString()
            suggestionData[index].windspeed = wind.speed.toString()
           
            // uses the getDay function to get all of the upcoming days' weather
            suggestionData[index].dayone = weatherData.list[0]

            var array = this.getday(weatherData, 1, suggestionData[index].dayone)
            suggestionData[index].daytwo = array[0]

            array = this.getday(weatherData, array[1], suggestionData[index].daytwo)
            suggestionData[index].daythree = array[0]

            array = this.getday(weatherData, array[1], suggestionData[index].daythree)
            suggestionData[index].dayfour = array[0]

            array = this.getday(weatherData, array[1], suggestionData[index].dayfour)
            suggestionData[index].dayfive = array[0]
        }
        this.setState({
            // set the new information as the state and loaded as true to indicate that the data from
            // the api has been stored
            suggesteddestinations : suggestionData,
            loaded: true
        })
    }

    render (){
        return(
            <div>
                {this.state.loaded ? //only render the page if the content from the api has been loaded
                <div>
                    {
                    <BrowserRouter>
                        <Redirect to="/Home" />
                        <div className="container">
                            {/* container that contains all of the different paths for the application and renders the homepage */}
                            <Route path="/Search" render={(props) =>
                                <Search {...props} suggesteddestinations={this.state.suggesteddestinations} scheduleddestinations={this.state.scheduleddestinations} />
                            } />
                            <Route path="/Home" render={(props) =>
                                <Home {...props} suggesteddestinations={this.state.suggesteddestinations} />
                            } />

                            <Route path="/CurrentWeather/:id" component = {CurrentWeather} />
                            <Route path="/EventSelection/:id" component = {EventSelection} />
                            <Route path="/Schedule" component = {Schedule} />
                            <Route path="/Header" component = {Header} />
                        </div>
                    </BrowserRouter>
                    }
                    </div> :  
                    <div className="container">
                        <Header />
                    </div>
                    }
                </div>   
            )
        }
    }

export default App;
