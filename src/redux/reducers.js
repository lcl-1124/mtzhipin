/*
包含多个用于生成新的state的reducer函数的模块
    根据老的state和指定的action对象的type属性值返回一个新的state
*/

import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-type'
import {redirectPath} from '../utils/index'     //引入工具模块

//定义初始化state
const initUser = {
    username: '',   //用户名
    userType: '',   //用户类型
    msg: '',         //错误提示信息
    redirectTo: ''  //需要自动重定向的路由路径
}
function user(state=initUser,action) {  //接收到的action对象
    switch (action.type) {
        case AUTH_SUCCESS:  //认证成功  data是user
            const {userType,header} = action.data; 
            return  {...action.data,redirectTo: redirectPath(userType,header)}   //先解构旧的state，在解构data去覆盖它
        case ERROR_MSG: //认证失败  data是msg
            return  {...state,msg: action.data} //先解构旧的state，在它的基础上修改msg内容
        case RECEIVE_USER: //接收用户信息  data是user
            return  action.data
        case RESET_USER: //重置用户信息  data是msg
            return  {...initUser,msg: action.data}  
        default:
            return state
    }
}

const initUserList = [];
function userList(state=initUserList,action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return  action.data
        default:
            return state
    }
}

//定义初始initChat
const initChat = {
    users: {},          //所有用户信息的对象    属性名： userid,属性值：{username,header}
    chatMsgs: [],       //当期那用户相关的所有消息列表
    unReadCount: 0  //未读消息数量
}
//产生聊天状态的reducer
function chat(state=initChat,action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:  //data：{users,chatMsgs}
            const {users,chatMsgs,userid} = action.data;
            return  {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((pretotal, msg) => pretotal + (!msg.read && msg.to===userid?1:0),0)
            }
        case RECEIVE_MSG:   //data：{chatMsg,userid}
            const {chatMsg} = action.data; 
            return  {
                users: state.users,
                chatMsgs: [...state.chatMsgs,chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to===action.data.userid?1:0)
            }
        case MSG_READ:  //data: {from,to,count}
            const {from,to,count} = action.data
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from===from && msg.to===to && !msg.read) {//需要更新
                        return {...msg,read: true}
                    } else {//不需要更新
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}

/*
返回合并后的reducer函数
    向外暴露的状态结构：{user：{},userList: []}
*/
export default combineReducers({//返回的依然是一个reducer函数
    user,
    userList,
    chat
})
