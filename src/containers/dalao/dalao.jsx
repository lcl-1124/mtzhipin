/*
dalao路由主界面
*/
import React,{Component} from 'react'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'

class Dalao extends Component{
    componentDidMount () {
        //异步发送获取指定userType的用户信息的action
        this.props.getUserList('boos')
    }
    render () {
        const {userList} = this.props;
        return (
            <div>
                <UserList userList={userList}/>
            </div>
        )
    }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Dalao)
