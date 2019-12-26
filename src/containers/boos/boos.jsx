/*
boos路由主界面
*/
import React,{Component} from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Boos extends Component{
    componentDidMount () {
        this.props.getUserList('dalao')
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
)(Boos)
