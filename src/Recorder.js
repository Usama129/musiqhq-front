import React, {Component} from 'react'
import './css/Recorder.css'
import { BsMic } from 'react-icons/bs';
import { IconContext } from "react-icons";
import axios from "axios";
import {StyleRoot} from "radium";

class Recorder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recording: false,
            recordStartTime: null,
            recordingID: null,
            recognized: false,
            statusMessage: ""
        }
    }

    handleClick = (event) => {
        if (event.type === "mousedown"){
            if (!this.state.recording ) {
                this.startRecording()
                this.setState({recording: true, recordStartTime: new Date().getTime()})
            }
            else {
                this.stopRecording()
            }
        }
    }

    startRecording = () => {
        let context = this
        let id = this.makeID(9)
        this.setState({recordingID: id})
        navigator.mediaDevices.getUserMedia({audio:true}).then(stream => {
            this.setState({statusMessage:"Listening"})
            this.stream = stream
            context.recorder = new MediaRecorder(stream)
            context.recorder.start(1500)
            const audioChunks = []

            context.recorder.ondataavailable = function (e) {
                if (!this.state.recognized){
                    console.log("data available");
                    audioChunks.push(e.data);
                    context.recognize(new Blob(audioChunks, { 'type' : 'audio/ogg; codecs=opus' }))
                }
            };

            setTimeout(() => {
                if (this.recorder.state === "recording" && this.state.recordingID === id) {
                    this.stopRecording()
                    if (!this.state.recognized)
                        this.setState({statusMessage: "Try Again"})
                }
            }, 10000);
        })
/*
        let context = this
        this.recorder.start().then(() => {

        }).catch((e) => { console.error(e); });*/
    }

    stopRecording = () => {
        if (this.recorder?.state === "inactive")
            return
           /* this.recorder
            .stop()
            .getMp3().then(([buffer, blob]) => {
                if ((new Date().getTime()) - this.state.recordStartTime > 5000) {
                    const file = new File(buffer, 'audio.mp3', {
                        type: blob.type,
                        lastModified: Date.now()
                    });
                    this.recognize(file)
                }

        }).catch((e) => {
            alert('We could not retrieve your message');
            console.log(e);
        });*/
        this.recorder.stop()
        this.stream.getTracks().forEach( track => track.stop() )
        this.setState({recording: false, statusMessage: "", recordingID: null})
    }

    recognize = (audio) => {
        if (this.state.recognized)
            return
        const form = new FormData();
        form.append(
            "file",
            audio,
            audio.name,
        );
        form.append("api_token", "210f7e7fb7de8c169995e9649ad94956")
        form.append("return", "spotify")

        let context = this
        axios.post('https://api.audd.io/recognize/', form)
            .then(function (response) {
                if (response.data.result === null || response.data.error){
                    //context.setState({statusMessage:"Try again"})
                    console.log("null or error")
                }
                else{
                    //console.log(response.data.result)
                    context.setState({recognized: true})
                    context.stopRecording()
                    context.props.proceed(response.data.result)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    makeID = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    render(){
        return(
            <StyleRoot style={{height: "100%"}}>
                <div style={this.props.anim.pulse} className="recorder-container">
                    <div className={"mic-circle" + (this.state.recording ? '-active' : '-passive')}
                         onMouseDown={this.handleClick} onMouseUp={this.handleClick}>
                        <IconContext.Provider value={{ size: "3em", className:"mic-icon" }}>
                            <div>
                                <BsMic />
                            </div>
                        </IconContext.Provider>
                    </div>
                    { (!this.state.recognized) ?
                        <h2 className={"status-message"}>{this.state.statusMessage}</h2> : null}

                </div>
            </StyleRoot>
        )
    }
}

export default Recorder;
