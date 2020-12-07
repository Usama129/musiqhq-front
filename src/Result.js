import React, {Component} from 'react'
import './css/Result.css'
import { pulse } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = props.data
        this.styles = {
            pulse: {
                animation: 'x 1s',
                animationName: Radium.keyframes(pulse, 'pulse')
            }
        }
    }

    componentDidMount() {
        //console.log(this.props.data)
    }

    render() {


        return (
            <StyleRoot>
                <div className="result-container" style={this.styles.pulse}>
                    <img className="album-art" src={this.state.spotify.album.images[0].url}/>
                    <h3>{this.state.title}</h3>
                    <h4>{this.state.artist}</h4>
                </div>
            </StyleRoot>
        )
    }
}

export default Result;