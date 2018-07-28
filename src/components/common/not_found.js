import React from 'react'
import notfound from '../../img/404.gif'

const NotFound=() => {
  return (
    <div style = {{width:'100%',height:'100vh'}}>
      <img style ={{display:'block',margin:'0px auto'}} src={notfound}/>
    </div>
  )
}

export default NotFound
