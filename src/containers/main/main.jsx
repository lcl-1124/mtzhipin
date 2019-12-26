/*
    主界面路由组件
*/

import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'   //引入路由语义标签
import {connect} from 'react-redux' //将UI组件包装成容器组件
import cookie from 'js-cookie'  //引入处理浏览器cookie的依赖包
import {NavBar} from 'antd-mobile'    //引入蚂蚁金服UI组件库

import BoosInfo from '../boos-info/boos-info'
import DalaoInfo from '../dalao-info/dalao-info'
import {redirectPath} from '../../utils/index'  //拿到工具组件
import {getUser} from '../../redux/actions'
import Boos from '../boos/boos'
import Dalao from '../dalao/dalao'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../../containers/chat/chat'

class Main extends Component{

    //给组件对象添加属性
    navList = [ // 包含所有导航组件的相关信息数据
        {
          path: '/boos', // 路由路径
          component: Boos,
          title: '大佬列表',
          icon: 'dalao',
          text: '大佬',
        },
        {
          path: '/dalao', // 路由路径
          component: Dalao,
          title: 'Boos列表',
          icon: 'boos',
          text: 'Boos',
        },
        {
          path: '/message', // 路由路径
          component: Message,
          title: '消息列表',
          icon: 'message',
          text: '消息',
        },
        {
          path: '/personal', // 路由路径
          component: Personal,
          title: '用户中心',
          icon: 'personal',
          text: '个人',
        }
      ]

    componentDidMount () {
        //登录过(cookie中有userid),但没有登录(redux管理的user中没有_id)，发请求获取对应的user
        const userid = cookie.get('userId');
        const {user} = this.props;
        if (userid && !user._id) {
            this.props.getUser()
        }
    }

    render () {
        // 拿到cookie中的userid
        const userid = cookie.get('userId');
        //判断是否有userid
        if (!userid) {//没有，重定向到/login
            return <Redirect to='/login'/>
        }
        //拿到redux中的_id
        const {user,unReadCount} = this.props;
        //判断redux中是否有_id
        if (!user._id) {//没有，暂时不做显示
            return null
        } else {//有，重定向到对应页面
            //拿到当前请求路径
            let path = this.props.location.pathname;
            if (path === '/') {
                //如果请求的是根路径，则根据user和userType来计算出一个重定向的路由路径，并自动重定向
                path = redirectPath(user.userType,user.header);
                return <Redirect to={path}/>
            }
        }
        
        //拿到navList
        const {navList} = this;
        //拿到请求的路径
        const path = this.props.location.pathname;
        //拿到当前的Nav,可能没有
        const currentNav = navList.find(nav => nav.path === path)
        //判断currentNav是否存在
        if (currentNav) {//存在，设置隐藏图标
            //判断当前userType
            if (user.userType === 'boos') {//boos页面，显示大佬图标
                navList[1].hide = true
            } else {//大佬页面，显示Boos图标
                navList[0].hide = true
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map((nav,index) => <Route key={index} path={nav.path} component={nav.component} />)
                    }
                    <Route path='/boosinfo' component={BoosInfo} />
                    <Route path='/dalaoinfo' component={DalaoInfo} />
                    <Route path='/chat/:userid' component={Chat}/>

                    <Route component={NotFound} />
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
            </div>
        )
    }
}

export default connect(//将UI组件包装成容器组件
    state => ({user: state.user,unReadCount: state.chat.unReadCount}),
    {getUser}
)(Main)

/*
1.实现自动登录:
    1.componentDidMound()
        登录过(cookie中有userid),但没有登录(redux管理的user中没有_id)，发请求获取对应的user
    2.render()
        1).如果cookie中没有userid，直接重定向到login
        2).判断redux管理的user中是否有_id,如果没有，暂时不做任何显示
        3).如果有，说明当前已经登录，显示对应的界面
        4).如果重定向到根路径，则根据user和userType来计算出一个重定向的路由路径，并自动重定向
*/