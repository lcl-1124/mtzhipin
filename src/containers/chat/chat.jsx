/*
实时聊天路由组件
*/
import React from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem,Grid,Icon} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import {sendMsg,readMsg} from '../../redux/actions'

const Item = List.Item 

class Chat extends React.Component {
    state ={
        content: '', //初始化聊天内容
        isShow: false   //表情网格是否显示
    }

    componentWillMount () {
        const emojis = [
                    '😀','😀','😃','😄','😁','😆','😅','😂','😉','😊','😇','😍','😘','😗','😚','😙','😋','😛',
                    '😜','😝','😐','😑','😶','😏','😒','😬','😌','😔','😪','😴','😷','😵','😕','😟','😮','😯',
                    '😲','😳','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','😤','😡',
                    '😠','☹','😈','👿','💀','☠','💩','👹','👺','👻','👽','👾'
                ]
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }

    componentDidMount () { 
        // 初始显示列表 
        window.scrollTo(0, document.body.scrollHeight) 
    }

    componentDidUpdate () { 
        // 更新显示列表 
        window.scrollTo(0, document.body.scrollHeight) 
    }
    componentWillUnmount () {
        /*更新未读消息*/
        //获取目标id
        const from = this.props.match.params.userid;
        //获取本人id
        const to = this.props.user._id;
        this.props.readMsg(from,to)
    }
    
    handleSend = () => {
        //拿到请求参数
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content;
        
        if (content) {//判断content是否取到值
            //发请求
            this.props.sendMsg({from,to,content})
        }
        //清除输入内容content
        this.setState({
            content: '',
            isShow: false
        })
    }

    setEmojis = () => {
        const isShow = !this.state.isShow;
        //更新state
        this.setState({
            isShow
        })
        if (isShow) {
            // 异步手动派发 resize 事件,解决表情列表显示的 bug
            setTimeout(() => { 
                window.dispatchEvent(new Event('resize')) 
            }, 0)
        }
    }
    render() { 
        const {user} = this.props;
        const {users,chatMsgs} = this.props.chat;
        
        const myId = user._id;

        //判断是否获取导数据
        if (!users[myId]) {
            return null
        }

        const targetId = this.props.match.params.userid;
        const chatId = [myId,targetId].sort().join('_');
        //对chatMsgs进行过滤
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);

        //得到目标用户的header图片头像
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null;
        //得到自己的header图片头像
        const myHeader = users[myId].header
        const myIcon = myHeader ? <img src={require(`../../assets/images/${myHeader}.png`)}/> : null;

        return ( 
            <div id='chat-page'> 
                <NavBar 
                    className='stick-top' 
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar> 
                <List style={{marginTop: 50,marginBottom: 50}}> 
                    <QueueAnim type='left'>
                        {
                            msgs.map(msg => {
                                if (myId === msg.to) {//对方发给我的
                                    return (
                                        <Item
                                            key={msg._id} 
                                            thumb={targetIcon} 
                                        > {msg.content} </Item>
                                    )
                                } else {//我发给对方的
                                    return (
                                        <Item 
                                            key={msg._id}
                                            className='chat-me' 
                                            extra={myIcon} 
                                        > {msg.content} </Item>
                                    )
                                }
                            })
                        } 
                    </QueueAnim>
                </List> 
                <div className='am-tab-bar' style={{background: 'pink'}}> 
                    <InputItem 
                        placeholder="开始聊天吧" 
                        value={this.state.content}
                        onChange={val => this.setState({content:val})}
                        onFocus={() => this.setState({isShow: false})}
                        style={{backgroundColor: '#eee'}} 
                        extra={ 
                            <span>
                                <span  onClick={this.handleSend} style={{marginRight: 5}}>发送</span>
                                <span onClick={this.setEmojis}>😊</span>
                            </span>
                        } 
                    /> 
                    {
                        this.state.isShow ? (
                            <Grid 
                                data={this.emojis} 
                                columnNum={7} 
                                carouselMaxRow={4} 
                                hasLine={false}
                                isCarousel={true} 
                                onClick={(item) => { this.setState({content: this.state.content + item.text}) }} 
                            />
                        ) : null
                    }
                    
                </div> 
            </div> 
        ) 
    } 
}

export default connect(
    state => ({user: state.user,chat: state.chat}),
    {sendMsg,readMsg}
)(Chat)