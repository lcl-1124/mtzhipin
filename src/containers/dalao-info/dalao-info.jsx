/*
user信息完善的路由容器组件
*/
import React,{Component} from 'react'
import {connect} from 'react-redux' //将UI组件包装成容器组件
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'    //引入蚂蚁金服UI组件库
import {Redirect} from 'react-router-dom'   //引入跳转页面的标签

import HeaderSelector from '../../components/header-selector/header-selector'   //引入头像选择组件 
import {updateUser} from '../../redux/actions'  //引入更新用户信息的异步action

class DalaoInfo extends Component{
    state = {
        header: '', // 头像名称
        info: '', // 职位简介 
        post: '' // 职位名称 
    }
    //处理数改变
    handleChange = (key,value) => {
        //更新state
        this.setState({
            [key]: value
        })
    }
    //保存信息
    saveInfo = () => {
        //调用引入更新用户信息的异步action
        this.props.updateUser(this.state)
    }
    //头像选择设置
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    handleChange
    render () {
        const {header,userType} = this.props.user;
        if (header) {
            return(
                <Redirect to={`/${userType}`}/>
            )
        }
        return (
            <div>
                <NavBar>user信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入求职岗位' onChange={val => this.handleChange('post',val)}>求职岗位：</InputItem>
                <TextareaItem title='个人介绍：' placeholder='请输入个人介绍' rows={6} onChange={val => this.handleChange('info',val)}/>
                <Button type='primary' onClick={this.saveInfo}>保&nbsp;存&nbsp;信&nbsp;息</Button>
            </div>
        )
    }
}

export default connect( //将UI组件包装成容器组件
    state => ({user: state.user}),
    {updateUser}
)(DalaoInfo)