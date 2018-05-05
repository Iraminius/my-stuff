import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore, history } from './store'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'

import './res/fonts/roboto.ttf'
import ListsMenu from './containers/ListsMenu'
import List from './containers/List'
import './main.less'

const store = configureStore()

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route exact path="/" component={ListsMenu}/>
                            <Route path="/:listId" component={List}/>
                        </Switch>
                    </ConnectedRouter>
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))