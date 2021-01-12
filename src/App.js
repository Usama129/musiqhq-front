import './App.css';
import Recorder from "./Recorder";
import Result from "./Result"
import React from "react";
import { pulse } from 'react-animations';
import Radium from "radium";

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            view: "record",
            result: null
        }
        this.styles = {
            pulse: {
                animation: 'x 1s',
                animationName: Radium.keyframes(pulse, 'pulse')
            }
        }
    }

    switchToResult = (result) => {
        console.log(result)
        this.setState({
            view: "result",
            result: result
        })
    }

    switchToRecorder = () => {
        this.setState({
            view: "record",
            result: null
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="main-box">

                        {this.state.view === "record" &&
                        <Recorder proceed={this.switchToResult} anim={this.styles}/>}

                        {this.state.view === "result" &&
                        <Result data={this.state.result} goBack={this.switchToRecorder} anim={this.styles}/>}

                    </div>
                </header>
            </div>
        );
    }
}

export default App;
