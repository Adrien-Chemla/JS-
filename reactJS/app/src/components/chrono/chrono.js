import React, { Component } from 'react';
import './chrono.css';

export default class Chrono extends Component {

    state = {
        millisecondes : 0,
        secondes : 0,
        minutes : 0,
    };

    start(){
        this.timer = setInterval(() => {
            let { minutes, secondes, millisecondes } = this.state;

            millisecondes++;

            if (millisecondes > 99){
                secondes++;
                millisecondes = 0;
            }

            if (secondes > 59) {
                minutes++;
                secondes = 0;
            }
            this.setState({
                minutes,
                secondes,
                millisecondes,
            });
            if (millisecondes === 0 && secondes % 10 === 0) {
                this.snapshot();
            }
        }, 10);
    };

    stop(){
        clearInterval(this.timer);
    }

    reset(){
        this.setState({
            minutes: 0,
            secondes: 0,
            millisecondes: 0,
        });
    }
        snapshot() {
            const { minutes, secondes, millisecondes } = this.state;
            const snap = {minutes, secondes, millisecondes};
            console.log("Snap", snap);
            if (this.props.onSnapshot) {
                this.props.onSnapshot(snap, "test");
            }
        }
    
    render() {
        const{minutes,secondes,millisecondes}=this.state;
        return(
            <div className="chrono">
                <span class="chrono__times">{minutes}:{secondes}:{millisecondes}</span>
                <div>
                    <button class="chrono__button" onClick={()=> this.start()}>Start</button>
                    <button class="chrono__button" onClick={()=> this.stop()}>Stop</button>
                    <button class="chrono__button" onClick={()=> this.reset()}>Reset</button>
                </div>        
                <div>
                <button class="chrono__button large" onClick={()=> this.snapshot()}>Snapshot</button>
                </div>    
            </div>
        )
    }
}