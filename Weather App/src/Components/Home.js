import React, { Component } from 'react'
import Card from './Card';
import Label from './Label';
import '../Styles/HomeStyle.css';
import {Link} from 'react-router-dom';
import {Header} from './Header'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

export class Home extends Component {
    // initializing the state for the Home component with information about the
    // current location, suggested destinations, and scheduled destinations
    state = {
        currentLocation : "London",
        currentTemp : "",
        desc: "",
        suggesteddestinations : this.props.suggesteddestinations,
        scheduleddestinations : [],
        loaded : false,
        appearHome : true
    }

    componentDidMount = () => {
        if (this.props.location.state){
            // set the scheduled destinations if they are available
            this.setState({
                scheduleddestinations : this.props.location.state.data,
            })
        }
    }

    render(){
        if(this.state.scheduleddestinations.length > 0){
            // set loaded as true if there are previously scheduled destinations
            this.state.loaded = true
        }
        
        return (
            <div>
                {/* display the header in the page */}
                <Header history = {this.props.history} sdd={this.state.scheduleddestinations} />
                <TransitionGroup>
                    {/* creates a transition between pages */}
                    <CSSTransition
                    in = {true}
                    appear = {true}
                    key = {0}
                    timeout = {80}
                    classNames= {"fade"}
                    >
                <div>
                <div className="welcome"><Label text="Current Weather"/></div>
                {/* creates the current weather card at the top of the screen with a link to the 
                current weather page for the current location */}
                <Link className="linkStyle" to={{
                    pathname: `CurrentWeather/${0}`,
                    state:{info:{
                        data : this.state.suggesteddestinations,
                        sdd : this.state.scheduleddestinations
                    }}
                }}>
                        <div className="welcome"><Card back={this.state.suggesteddestinations[0].url} title={this.state.suggesteddestinations[0].name} desc={this.state.suggesteddestinations[0].desc} weather={this.state.suggesteddestinations[0].temp} width="100" height="110"/></div>
                </Link>

                <Label text="Recently Scheduled Holidays"/>
                {!this.state.loaded ?
                    // if there are no scheduled holidays then print a message indicating no scheduled holidays
                    <div className="noSE">
                        {<p id="noschedule">No Scheduled Holidays. Get Planning!</p>}
                    </div>:
                <div className="horizontalScroll">
                    {/* if there are scheduled holidays then create a card for each one in a horizontal scroll bar
                    and link each of them to their specific schedule page */}
                    {this.state.scheduleddestinations.map((dest) => (
                        <Link className="linkStyle" key={dest.id} to={{
                            pathname: '/Schedule',
                            state:{
                                selectedInformation : dest
                            },
                            sdd : this.state.scheduleddestinations
                        }
                        }>
                            <Card scheduled back={dest.information.url} title={dest.information.name} weather={dest.information.temp} desc={dest.information.desc} width="114.8" height="110"/>
                        </Link>
                    ))}
                    {/* create an invisible card at the end of the scroll bar for formatting */}
                    <Card width="0.1" invisible/>
                </div>
                }
                <Label text="Recommended Holiday Destinations"/>
                <div className="verticalScroll">
                    {/* display all of the suggested destination cards in a vertical scroll bar 
                    with links to the current weather pages for each destination */}
                    {this.state.suggesteddestinations.slice(1).map((dest) =>(
                        <Link className="linkStyle" key={dest.id} to={{
                            pathname: `CurrentWeather/${dest.id}`,
                            state:{info:{
                                data : this.state.suggesteddestinations,
                                sdd : this.state.scheduleddestinations
                            }}
                        }}>
                            <Card back={dest.url} title={dest.name} weather={dest.temp} desc={dest.desc} width="100" height="110"/>
                        </Link>
                    ))}
                </div>
                </div>
                </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}

export default Home
