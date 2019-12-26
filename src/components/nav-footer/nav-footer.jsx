/*
底部导航页面
*/
import React,{Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom' //将非路由组件包装成路由组件

const Item = TabBar.Item;
class NavFooter extends Component{
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render () {
        let {navList,unReadCount} =this.props;
        const path = this.props.location.pathname;  //请求的path
        //过滤得到期望的navList
        navList = navList.filter(nav => !nav.hide);
        return (
            <div>
                <TabBar barTintColor='#eee'>
                    {
                        navList.map((nav,index) => 
                            <Item 
                                key={nav.path}
                                title={nav.text}
                                badge={nav.path === '/message' ? unReadCount : 0}
                                icon={{uri: require(`./images/${nav.icon}.png`)}}
                                selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                                selected={nav.path === path}
                                onPress={() => {
                                    this.props.history.replace(nav.path)
                                }}
                            />
                        )
                    }
                </TabBar>
            </div>
        )
    }
}

/*
向外暴露witchRoute()包装产生的组件
    内部会向组件中传入一些组件特有的属性：history/location/math
*/
export default withRouter(NavFooter)    

/*
希望在非路由组件中使用路由库的api
    react-router-dom里的witchRoute()
*/