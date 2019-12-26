/*
boos信息完善的路由容器组件
*/
import React,{Component} from 'react'
import {connect} from 'react-redux' //将UI组件包装成容器组件
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'    //引入蚂蚁金服UI组件包
import {Redirect} from 'react-router-dom'   //引入跳转页面的标签

import HanderSelector from  '../../components/header-selector/header-selector' //引入头像选择组件
import {updateUser} from '../../redux/actions'    //引入更新用户信息的异步action

class BoosInfo extends Component{

    state = {
        header: '', // 头像名称
        info: '', // 职位简介 
        post: '', // 职位名称 
        company: '', // 公司名称 
        salary: '' // 工资
    }

    //监听头像设置
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    //处理数据变化
    handleChange = (key,value) => {
        this.setState({
            [key]: value
        })
    }

    //信息保存
    saveInfo = () => {
        //调用引入更新用户信息的异步action
        this.props.updateUser(this.state)
    }

    render () {
        
        const {header,userType} = this.props.user;
        if (header) {
            return(
                <Redirect to={`/${userType}`}/>
            )
        }
        return (
            <div>
                <NavBar>boos信息完善</NavBar>
                <HanderSelector setHeader = {this.setHeader}/>
                <InputItem placeholder='请输入招聘职位' onChange={val => this.handleChange('post',val)}>招聘职位：</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={val => this.handleChange('company',val)}>公司名称：</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={val => this.handleChange('salary',val)}>职位薪资：</InputItem>
                <TextareaItem title='职位要求：' rows={3} placeholder='请输入职位要求' onChange={val => this.handleChange('info',val)}/>
                <Button type='primary' onClick={this.saveInfo}>保&nbsp;存&nbsp;信&nbsp;息</Button>
            </div>
        )
    }
}

export default connect( //将UI组件包装成容器组件
    state => ({user:state.user}),
    {updateUser}
)(BoosInfo)