import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Chrono from "./components/chrono/chrono";
import * as firebase from 'firebase'
import config from './config'

class App extends Component {

  // state = {
  //   currentSnapshots:[],
  // };

  // whenSnapshot(snapshot) {
   
  //   const { currentSnapshots } = this.state;
  //   currentSnapshots.push(snapshot);
  //   console.log("APP", currentSnapshots);
    
  //   this.setState({
  //     currentSnapshots
  //   });
  // }
  // <Chrono onSnapshot={this.whenSnapshot.bind(this)} />
  //         {this.state.currentSnapshots.map((snap, index) => 
  //           <div key={index}>N° {index}: {snap.minutes}:{snap.secondes}:{snap.millisecondes}</div>
  //         )}

  constructor () {
    super()
    firebase.initializeApp(config)
    this.state = {
      loading: true
    }

  }

  componentWillMount () {
    const ref = firebase.database().ref('Devs')

    ref.on('value', snapshot => {
      this.setState({
        Devs: snapshot.val(),
        loading: false

      })
    })
  }
  render() {

    if(this.state.loading) {
      return <h1>Chargement</h1>
    }

    const Dv = this.state.Devs.map(dev => <p>{dev.nom} votre temps est de : {dev.temps} minute(s).</p>)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        {Dv}
      </div>
    );
  }
}

export default App;
