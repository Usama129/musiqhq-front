import React, {Component} from 'react'
import 'react-voice-recorder/dist/close~bbahVpKh.png'
import {Recorder} from "react-voice-recorder";
import 'react-voice-recorder/dist/index.css'
import axios from 'axios';

class myRecorder extends Component{
    constructor(props) {
        super(props);
        this.state = {
            audioDetails: {
                url: null,
                blob: null,
                chunks: null,
                duration: {
                    h: 0,
                    m: 0,
                    s: 0
                }
            }
        }
    }

    handleAudioStop = (data) => {
        console.log(data)
        this.setState({ audioDetails: data });

    }
    handleAudioUpload = (file) => {
        console.log(file);
        const formData = new FormData();
        formData.append(
            "audioFile",
            file,
            file.name,
        );


        axios.post('http://localhost:9000/recog', formData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleRest = () => {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0
            }
        };
        this.setState({ audioDetails: reset });
    }

    render() {
        return (<Recorder
            record={true}
            title={"New recording"}
            audioURL={this.state.audioDetails.url}
            showUIAudio
            handleAudioStop={data => this.handleAudioStop(data)}
            handleAudioUpload={data => this.handleAudioUpload(data)}
            handleRest={() => this.handleRest()}
        />);
    }
}

export default myRecorder;