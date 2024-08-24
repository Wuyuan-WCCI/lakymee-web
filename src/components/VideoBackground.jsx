import React, {useRef, useEffect} from "react";
import './VideoBackground.css';

const VideoBackground = () => {
    const videoRef = useRef(null);
    useEffect(()=> {
        if(videoRef.current){
            videoRef.current.playbackRate = 0.07;
        }
    }, [])

    return(
        <div className="video-background">
            <video ref={videoRef} autoPlay loop muted playsInline className="background-video">
                <source src="/src/assets/universe.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="content">
                <h1>Welcome to Lakymeeme Nail Salon</h1>
            </div>
        </div>
    )
}

export default VideoBackground;