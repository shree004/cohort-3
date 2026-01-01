import  {useState,useEffect} from 'react';

function Usee() {
  const [data, setData] = useState(1);
  
  function incrementData() {
    console.log("Incrementing data" + data);
    setData(a=>a + 1);
  }

  useEffect(() => {
    console.log("Setting up interval"); 
    //setInterval(incrementData, 1000);
  }, []);
  return <div>
    The value of data is: {data} 
  </div>
}

export default Usee;