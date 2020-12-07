import './App.css';
import Recorder from "./Recorder";
import Result from "./Result"
import React from "react";


class App extends React.Component{
    constructor() {
        super();
        this.state = {
            view: "record",
            result: null
        }
    }

    switchToResult = (result) => {
        this.setState({
            view: "result",
            result: result
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="main-box">
                        {this.state.view === "record" && <Recorder proceed={this.switchToResult}/>}
                        {this.state.view === "result" && <Result data={this.state.result}/>}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
