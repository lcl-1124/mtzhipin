/*
显示指定用户信息的路由组件
*/
import React from 'react'
import {Card,WhiteSpace,WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

class UserList extends React.Component{
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render () {
        return (
            <WingBlank style={{marginBottom : 50,marginTop :  50}}>
                <QueueAnim type='scale'>
                    {
                        this.props.userList.map(user => (
                            <div key={user._id}>
                                <WhiteSpace/>
                                    <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                        <Card.Header
                                            extra={user.username}
                                            thumb={require(`../../assets/images/${user.header}.png`)}
                                        />
                                        <Card.Body>
                                            <p>职位：{user.post}</p>
                                            {user.company ? <p>公司：{user.company}</p> : null}
                                            {user.salary ? <p>月薪：{user.salary}</p> : null}
                                            <p>描述：{user.info}</p>
                                        </Card.Body>
                                    </Card>
                                <WhiteSpace/>
                            </div>
                        ))
                    }
                </QueueAnim>
            </WingBlank>  
        )
    }
}

export default withRouter(UserList)