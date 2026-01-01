import { useState } from 'react'
import {PostComponent} from './Post'

function App() {
  const [posts, setPostList] = useState([]);
  // const posts = [
  //   {
  //     name: 'Alice',
  //     subtitle: 'Designer',
  //     time: '1pm',
  //     description: 'This is Alice\'s post description.',
  //     image: './public/vite.svg'
  //   },
  //   {
  //     name: 'Bob',
  //     subtitle: 'Engineer',
  //     time: '3pm',
  //     description: 'This is Bob\'s post description.',
  //     image: './public/vite.svg'
  //   }
  // ]

  const PostComponents = posts.map((post, index) => (
    <PostComponent
      name={post.name}
      subtitle={post.subtitle}
      time={post.time}
      description={post.description}
      image={post.image}
    />
  ))
  function addPost() {
    setPostList([...posts,{
      name: 'New User',
      subtitle: 'New Role',
      time: 'Now',
      description: 'This is a new post description.',
      image: './public/vite.svg'
    }]);
  }

  return (
    <div style ={{backgroundColor: 'lightgray',height:'100vh'}}>
      <button onClick={addPost}>Add Post</button>
      <div style={{display:'flex',justifyContent:'center'}}>
        <div>
          {PostComponents}   
        </div>
      </div>
    </div>
  )
}

// function ToggleMessage() {
//   const [showMessage, setShowMessage] = useState(false);
//   return (
//     <div>
//       <button onClick={() => setShowMessage(!showMessage)}>
//         {showMessage ? 'Hide' : 'Show'} Message
//       </button>
//       {showMessage && <p>This is the toggled message!</p>}
//     </div>
//   );
// }

// const profile_style = {
//   width : 200,
//   backgroundColor: 'white',
//   borderRadius: '10px',
//   bordercolor: 'gray',
//   borderwidth: 1,
//   padding: 20
// } 
// function ProfileComponent() {
//   return <div style={profile_style}>
//         <div style={{display:'flex',flexDirection:'column',alignItems:'center',paddingBottom:15,borderBottom:'1px solid lightgray'}}>
//           <img src = {"./public/vite.svg"} style = {{
//             width: 60,
//             height: 60,
//             borderRadius: 40,
//             marginBottom: 30
//           }}/>
//           <div style={{fontsize:15,fontWeight:'bold',paddingBottom:8}}>Shree Varsaan</div>
//           <div style={{fontsize:10,opacity:'60%'}}>working on projects</div>
//         </div>
//         <div>
//           <div style ={{display:'flex',justifyContent:'space-between',marginTop:20}}>
//             <div>profile views</div>
//             <div style={{color:'#44b0eb'}}>12312</div>
//           </div>
//           <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
//             <div>post impressions</div>
//             <div style={{color:'#44b0eb'}}>3212</div>
//           </div>
//         </div>
//     </div>
// }
export default App
