import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from './Components/Homepage/Homepage';
import CategoryPage from './Components/CategoryPage/CategoryPage';

const App = () =>  {

    return (
        <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/category' component={CategoryPage} />
        </Switch>
    );
}

export default App;
