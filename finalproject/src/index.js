import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import Upload from './Upload/upload.js'
  import Search from './Search/search.js'
  import Newsfeed from './Newsfeed/newsfeed.js'
  import { Switch, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/upload' component={Upload}/>
      <Route path='/search' component={Search}/>
      <Route path='/newsfeed' component={Newsfeed}/>
    </Switch>
    </BrowserRouter>
     ) ,document.getElementById('root'));
registerServiceWorker();
