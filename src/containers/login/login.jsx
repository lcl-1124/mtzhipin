/*
    登录路由组件
*/

import React,{Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    WhiteSpace,
    InputItem,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux' //将UI组件包装成容器组件
import {Redirect} from 'react-router-dom'   //拿到重定向标签

import {login} from '../../redux/actions'   //用来发送登录请求的异步action
import Logo from '../../components/logo/logo'
import '../../assets/css/index.less'

class Login extends Component{
    state = {
        username: '',   //用户名
        password: ''    //密码
    }
    //操作数据
    handileChange = (key,value) => {
        //更新数据
        this.setState({
            [key]: value
        })
    }
    //登录调用
    login = () => {
        this.props.login(this.state)
    }
    //跳转页面
    toRegister = () => {
        this.props.history.replace('/register')
    }
    render () {
        const {msg,redirectTo} = this.props;
        //如果redirectTo有值，则重定向到指定的路由
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }
        return(
            <div style={{backgroundColor: '#fff'}}>
                <NavBar>明&nbsp;天&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    {msg ? <div className='error-msg'>{msg}</div> : null}
                    <List>
                        <InputItem placeholder="请输入用户名" onChange={val => this.handileChange("username",val)}>用户名：</InputItem>
                        <InputItem placeholder="请输入密码" type="password" onChange={val => this.handileChange("password",val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.login}>登录</Button>
                        <WhiteSpace/>
                        <Button style={{backgroundColor: "#ddd"}} onClick={this.toRegister}>没有账户，前往注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(//将UI组件包装成容器组件
    state => state.user,
    {login}
)(Login)