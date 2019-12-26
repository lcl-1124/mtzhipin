/*
   入口文件
*/

import React from 'react'
// import {render} from 'react-dom' //渲染虚拟dom
import ReactDom from 'react-dom'    //渲染虚拟dom
import {HashRouter,Route,Switch} from 'react-router-dom'   //路由
import {Provider} from 'react-redux'    //redux

import store from './redux/store'
import Main from './containers/main/main'
import Login from './containers/login/login'
import Register from './containers/register/register'

// import './test/socketio_test'

//渲染
ReactDom.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route component={Main}></Route>    {/*默认路由组件*/}
            </Switch>
        </HashRouter>
    </Provider>
),document.getElementById('root'))
