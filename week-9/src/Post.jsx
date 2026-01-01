const style = {
    width : 210,
    backgroundColor: 'white',
    borderRadius: '10px',
    bordercolor: 'gray',
    borderwidth: 1,
    padding: 20
  }
  
export function PostComponent({name="John Doe",subtitle,time,description,image="./public/vite.svg"}) {
    return <div style = {style}>
        <div style={{display:'flex'}}>
        <img src = {image} style = {{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 10
        }}/>
        <div style={{display:'flex',flexDirection:'column',fontSize:12}}>
          <b>{name}</b>
          <div>{subtitle}</div>
          {time !== undefined && <div>{time} clock</div>}
        </div>
      </div>
      <div style={{marginTop:10,fontSize:16}}>
        {description}
      </div>
    </div>
  }