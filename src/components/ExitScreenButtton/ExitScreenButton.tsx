import * as React from 'react';
import { FaCompress } from "react-icons/fa";
const ExitScreenButton=()=>{
    const onClickFullScreenButton=()=>{
        
            document.exitFullscreen();
       
    } 
    // return(
        // <button 
        // className='fullScreenButton'
        // onClick={onClickFullScreenButton}
        // style={{

        // }}>fullscreen</button>
        // <FaExpand className='fullScreenButton' id='fullscreenbutton' onClick={handle.enter} fontSize="50px" style={{
        //     position:"absolute",
        //     zIndex:1,
            
        // }} />
    //     <div>
    //   <button onClick={handle.enter}>
    //     Enter fullscreen
    //   </button>

    //   <FullScreen handle={handle}>
    //     Any fullscreen content here
    //   </FullScreen>
    // </div>
    
    // )
// if(document.fullscreenElement){
//     document.getElementById("exitButton").style.display="block";
// }
        return(
            <>
            <FaCompress  id='exitButton' fontSize={"15px"} color='white' style={{
                position:"absolute",
                zIndex:1,
                top:"3%",
                left:"2.6%",
            }}
            onClick={onClickFullScreenButton}></FaCompress>
            </>
        )
    
}
export default ExitScreenButton;