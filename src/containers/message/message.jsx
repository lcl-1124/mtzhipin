/*
消息路由界面
*/
import React, {Component} from 'react' 
import {connect} from 'react-redux' 
import QueueAnim from 'rc-queue-anim'
import {List, Badge} from 'antd-mobile' 
const Item = List.Item 
const Brief = Item.Brief 

/*
对chatMsgs按chat_id进行分组，并得到每个组的lastMsg组成的数组
1.得到每个聊天的lastMsg，并用一个对象容器来保存{chat_id：lastMsg}
2.得到所有lastMsg的数组
3.对数组进行排序(按creat_time降序)
*/
function getLastMsgs(chatMsgs,userid){
    // 1.得到每个聊天的lastMsg，并用一个对象容器来保存{chat_id：lastMsg}
    const lastMsgObjs = {};

    chatMsgs.forEach(msg => {

        //如果是别人向我发送消息且消息未读
        if (msg.to===userid && !msg.read) {
            msg.unReadCount = 1;
        } else {
            msg.unReadCount = 0;
        }

        //得到msg的聊天标识id
        const chatId = msg.chat_id;
        //获取已保存的当前组件的lastMsg
        const lastMsg = lastMsgObjs[chatId];

        if (!lastMsg) {//没有,保存
            lastMsgObjs[chatId] = msg;
        } else {//有,更新保存
            //累加未读数量
            const unReadCount = lastMsg.unReadCount + msg.unReadCount;
            //判断谁的creat_time大，谁就是lastMsg
            if (lastMsg.creat_time<msg.creat_time) {
                lastMsgObjs[chatId] = msg;
            }

            //更新unReadCount
            lastMsgObjs[chatId].unReadCount = unReadCount;
        }
    })
    // 2.得到所有lastMsg的数组
    const lastMsgs = Object.values(lastMsgObjs);
    // 3.对数组进行排序(按creat_time降序)
    lastMsgs.sort((m1,m2) => {//比较函数 返回数<0,m1在前，返回0,不变,返回数>0,m1在后
        return m2.creat_time - m1.creat_time
    })
    //返回lastMsgs
    return lastMsgs
}

class Message extends Component { 
    render() { 
        const {user} = this.props;
        const {users,chatMsgs} = this.props.chat;
        const lastMsgs = getLastMsgs(chatMsgs,user._id)
        return (
            <List style={{marginBottom: 50,marginTop: 50}}>
                <QueueAnim type='right'>
                    {
                        lastMsgs.map(msg => {
                            //拿到目标对象的id
                            const targetUserId = msg.to===user._id ? msg.from : msg.to;
                            //拿到目标对象
                            const targetUser = users[targetUserId];
                            return (
                                <Item 
                                    key={msg._id}
                                    extra={<Badge text={msg.unReadCount}/>} 
                                    thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null} 
                                    arrow='horizontal'
                                    onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                                > 
                                {msg.content}
                                <Brief>{targetUser.username}</Brief> 
                                </Item> 
                            )
                        })
                    }
                </QueueAnim>
            </List> 
        ) 
    } 
}

export default connect(
    state => ({user: state.user,chat: state.chat}),
    {}
)(Message)