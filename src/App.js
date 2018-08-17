import React, { Component } from 'react';
import LanguageDetector from './components/LanguageDetector';
import './App.css';

class App extends Component {
  render() {
    const date = new Date();
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Language Detector</h1>
        </header>
        <div className="App-intro">
          <LanguageDetector />
        </div>
        <footer className="App-footer">
          <div className="App-footer-wrapper">
            <p className="App-footer-title f-left">@iamwill</p>
            <p className="App-footer-title f-right">{ date.toUTCString() }</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
