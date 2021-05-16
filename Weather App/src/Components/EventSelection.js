import React, { Component } from 'react'
import FormCard from './FormCard'
import '../Styles/App.css';
import Header from './Header'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export class EventSelection extends Component {
    render() {
        var destination = this.props.location.state.info.data
        var sdd = this.props.location.state.info.sdd
        return (
            <div>
                {/* display the header in the page */}
                <Header history = {this.props.history} sdd ={sdd} />
                <TransitionGroup>
                    {/* creates a transition between pages */}
                    <CSSTransition
                    in = {true}
                    appear = {true}
                    key = {0}
                    timeout = {80}
                    classNames= {"fade"}
                    >
                    {/* loads the FormCard component into the page, passing in appropriate information */}
                    <FormCard c1={destination.color1} c2={destination.color2} width="100" sdd={sdd} 
                    location={destination} events={destination.events} id={destination.id}/>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}
export default EventSelection
