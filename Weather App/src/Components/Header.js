import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';


export class Header extends Component {
    // redirect to the search page
    push = () => {
        this.props.history.push({
            pathname: '/Search'
        })
    }

    // redirect to the home page
    pushHome = () => {
        this.props.history.push({
            pathname: '/Home',
            state: {
                data : this.props.sdd
            }
        })
    }

    render() {
        return (
            // returns the header component for the top of each page
            <div style={header}>
                <div style={inner}>
                    {/* creates a home button */}
                    <div style={btnContainer}><button onClick={this.pushHome} className="btn"><FontAwesomeIcon icon={faHome} /></button></div>
                    {/* displays the name of the application */}
                    <div style={appName}><p>Eventful Weather</p></div>
                    {/* creates a search button */}
                    <div style={btnContainer}><button onClick={this.push} className="btn"><FontAwesomeIcon icon={faSearch} /></button></div>
                </div>
            </div>
        )
    }
}

//returns styling for the header
const header = {
    backgroundColor: "#2a3d51",
    color: "#fff",
    height:"3em",
    boxShadow: "0 8px 6px -6px black",
    transition: "0.5s",
    borderRadius: "0 0 5px 5px",
}

// more styling for the header
const inner = {
    display: "flex",
    backgroudColor: "#fff",
    paddingTop: "0.2em"
}

// styling for the name of the application
const appName = {
    flex : "3",
    textAlign: "center",
    verticalAlign: "text-bottom",
    marginTop: "0.8em"
}

// styling for the button
const btnContainer = {
    flex : "1",
    textAlign: "center"
}
export default Header