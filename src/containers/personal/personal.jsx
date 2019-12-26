/*
个人中心路由界面
*/
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,Result,Button,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component{
    //设置退出逻辑
    exit = () => {
        Modal.alert('退出','确认退出么？',[
            {text: '取消'},
            {
                text: '确认',
                onPress: () => {
                    //清除浏览器中的cookie
                    Cookies.remove('userId')
                    //重置redux中的user
                    this.props.resetUser()
                }
            }
        ])
    }
    render () {
        const {username, header, post, info, salary, company} = this.props.user;
        return (
            <div style={{marginTop:50}}>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)}/>}
                    title={username}
                    message={company}
                />
                <List renderHeader = {() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {
                            salary? <Brief>薪资：{salary}</Brief> : null
                        }
                    </Item>
                </List>
                <Button type='warning' onClick={this.exit}>退出登录</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)