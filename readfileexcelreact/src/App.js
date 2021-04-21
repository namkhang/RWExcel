import React from 'react'
import {Switch , Route} from 'react-router-dom'

import Upload from './Component/Upload/Upload'
function App() {
  return (
    <div className="App">
          <Switch>
            <Route path='/' exact component={Upload} />
          </Switch>
    </div>
  );
}

export default App;
