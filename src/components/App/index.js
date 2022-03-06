import React from 'react';
import { withFirebase } from '../Firebase';

import ListProds from './listProds.js'

const applicaiton=(props)=>{

    return(
        <div>
            <h1>Produtos</h1>
            <hr />
            <ListProds firebase={props.firebase}></ListProds>
        </div>);
}

const App = withFirebase(applicaiton)
export default App;