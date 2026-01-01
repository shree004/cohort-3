import { useEffect, useState } from "react";

function Nav(){
    const [currentTab,SetTab] =useState(1);
    const [TabData,setTabData] = useState({});
    const [Loader,setLoader] = useState(true);

    useEffect(()=>{
        setLoader(true);
        fetch("https://jsonplaceholder.typicode.com/todos/" + currentTab)
            .then(async res => {
                const json = await res.json();
                setTabData(json);
                setLoader(false);
            });
    },[currentTab])
 
    return(
        <div>
            <button onClick={function(){
                SetTab(1)
            }} style={{color : currentTab ===1? "red" : "black"}}>Feed</button>
            <button onClick={function(){
                SetTab(2)
            }} style={{color : currentTab ===2 ? "red" : "black"}}>Notifications</button>
            <button onClick={function(){
                SetTab(3)
            }}style={{color : currentTab ===3? "red" : "black"}}>Messages</button>
            <button onClick={function(){
                SetTab(4)
            }}style={{color : currentTab ===4 ? "red" : "black"}}>Jobs</button>
            {Loader ? 'loading...' : TabData.title}
        </div>
    )
}

export default Nav;