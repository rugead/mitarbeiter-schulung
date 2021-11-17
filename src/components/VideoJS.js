import React, { useState, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { H3 } from "./Headline";
import {DialogText} from "./DialogText"


export const VideoJS = ( props ) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(true)
  const [showQizButton, setShowQuizButton] = useState(false)
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, setShowing, text  , title} = props;
  
  const renderTitle= Object.entries(title).map(([key, value]) => {
    return (value)
  })
  
  useEffect(() => {
  
    const onReady = (player) => {
      playerRef.current = player;
      
      player.on('playing', () => {
        console.log('player is playing');
      });
      player.on('ended', () => {
        setShowQuizButton(true)
        console.log("ended")
      })
      player.on('timeupdate', () =>{
        console.log('player on timeupdate');
      })
      player.on('waiting', () => {
        console.log('player is waiting');
      });   
      player.on('dispose', () => {
        console.log('player will dispose');
      });
    };  
  
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
        });
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.ready(function() {
      //   var lengthOfVideo = player.duration();
      //   console.log('lengthOfVideo: ', lengthOfVideo);
      // });
      // player.pause()
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex justify-around">  

      <DialogText isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} title={title} text={text} buttonText='weiter'/> 

        <div className="w-5/6 md:w-2/3 xl:w-2/4">
          <H3>{renderTitle.join(" / ")}</H3>
          <div className={`w-full bg-gray-500 rounded-lg shadow-lg p-1 mb-5`} >
            <div data-vjs-player  className="">
              <video ref={videoRef} className="border-red-500 video-js vjs-big-play-centered" />
            </div>
          </div>

          {showQizButton ?
            <div 
              onClick={() => setShowing('quiz')}
              className="w-full p-3 text-primary hover:bg-primary text-lg font-medium text-center mt-5 border border-primary cursor-pointer hover:text-gray-100  rounded-md" 
            > 
              Zum Quiz hier klicken!
            </div>
          :
          ''}
      </div>
    </div>
  );
}

export default VideoJS;