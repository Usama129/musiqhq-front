import React, {Component} from 'react'
import './css/Result.css'
import {StyleRoot} from 'radium';
import {ArrowBackRounded} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = props.data
    }

    componentDidMount() {
        //console.log(this.props.data)
    }

    render() {


        return (
            <div style={{height: "100%"}}>
                <StyleRoot>
                    <div className="result-container" style={this.props.anim.pulse}>
                        <img className="album-art" src={this.state.spotify?.album.images[0].url} alt="Album Art Unavailable"/>
                        <h3>{this.state.title}</h3>
                        <h4>{this.state.artist}</h4>
                    </div>
                </StyleRoot>
                <div className="backBtnContainer">
                   <div className="backBtn">
                       <IconButton onClick={()=>this.props.goBack()}>
                           <ArrowBackRounded style={{ color: "white", fontSize: 35}} />
                       </IconButton>
                   </div>
                </div>
            </div>
        )
    }
}

export default Result;