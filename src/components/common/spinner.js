import React from 'react';
import bars from '../../img/spinners/bars.gif'

function Spinner(){
    return(
        <img src = {bars} style={{margin:'auto', width:'150px', display:"block"}} alt="loading" />
    )
}

export default Spinner