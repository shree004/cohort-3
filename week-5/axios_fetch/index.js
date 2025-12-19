// const axios = require('axios');

// async function fetchData() {
//     const response = await axios.get("https://httpdump.app/dumps/2f636bad-d1b7-4bef-96b2-837458836878", 
//         {
//             headers: {
//                 'Content-Type': 'application/json namespace=example'
//             }
//         }
//     );
//     console.log(response.data);
// }  

// fetchData();

//fetch version

async function fetchData() {
    const response = await fetch("https://httpdump.app/dumps/2f636bad-d1b7-4bef-96b2-837458836878", 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json namespace=example'
            }
        }
    );
    const data = await response.json();
    console.log(data);
}  

fetchData();