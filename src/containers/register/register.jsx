/*
    注册路由组件
*/
import React,{Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    WhiteSpace,
    InputItem,
    Button,
    Radio
} from 'antd-mobile'
import {connect} from 'react-redux' //用于包装UI组件生成容器组件
import {Redirect} from 'react-router-dom'   //拿到重定向标签

import {register} from '../../redux/actions'    //拿到用来发送注册请求的异步action
import Logo from '../../components/logo/logo'
import '../../assets/css/index.less'

const ListItem = List.Item;

class Register extends Component{
    state = {
        username: '',       //用户名
        password: '',       //密码
        password2: '',      //确认密码
        userType: 'dalao'        //使用者类型    dalao/boos
    }
    //注册调用
    register = () => {
        this.props.register(this.state)
    }
    //操作数据
    handleChange = (key,value) => {
        //更新数据
        this.setState({
            [key]: value
        })
    }
    //跳转页面
    toLogin = () => {
        this.props.history.replace('/login')
    }
    render () {
        const {userType} = this.state
        const {msg,redirectTo} = this.props
        //如果redirectTo有值，就需要重定向到指定路由
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div style={{backgroundColor: '#fff'}}>
                <NavBar>明&nbsp;天&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    {msg ? <div className='error-msg'>{msg}</div> : null}
                    <List>
                        <InputItem onChange={val => this.handleChange("username",val)} placeholder='请输入用户名'>用户名：</InputItem>
                        <InputItem type="password" onChange={val => this.handleChange("password",val)} placeholder='请输入密码'>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <InputItem type="password" onChange={val => this.handleChange("password2",val)} placeholder='请再次输入密码确认'>确认密码：</InputItem>
                        <ListItem>
                            <span>注册类型：</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={userType === "dalao"} onClick={() => this.handleChange("userType","dalao")}>dalao</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={userType === "boos"} onClick={() => this.handleChange("userType","boos")}>boos</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.register}>注册账户</Button>
                        <WhiteSpace/>
                        <Button style={{backgroundColor: "#ddd"}} onClick={this.toLogin}>已有账户，前往登录</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(//将UI组件包装成容器组件
    state => state.user,
    {register}
)(Register)