import * as React from 'react';
import { FaCompress } from "react-icons/fa";
window.addEventListener("resize",function(){
    let id = this.document.getElementById("exitButton");
    let monsterId= this.document.getElementById("monsterId");
    if(window.innerWidth == screen.width && window.innerHeight == screen.height){ 
       
        monsterId.style.top="36vh";
    id.style.display ="block";
    id.style.color="white";
    
    }else{
        id.style.display="none";
        monsterId.style.top="120px";
    }
})
const ExitScreenButton=()=>{
    const onClickExitScreenButton=()=>{
        
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
            <FaCompress  id='exitButton' fontSize={"15px"}  style={{
                position:"absolute",
                zIndex:1,
                 marginLeft:"1vw",
                 marginTop:"25px",
                 display:"none"
            }}
            onClick={onClickExitScreenButton}></FaCompress>
            </>
        )
    
}
export default ExitScreenButton;