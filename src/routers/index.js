import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route path="/" component={MainPage} exact={true} />
            <Route component={NotFoundPage} />
        </Switch>
    </Router>
);

export default AppRouter;