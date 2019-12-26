/*
包含多个action creator 函数的模块
    异步action  (发请求)
    同步action
分发(dispatch)action后得到一个action对象
    action对象的两个属性：
        type：必要属性
        xxx: 自定属性
*/
//引入socketio
import io from 'socket.io-client'
import {
    reqRegister,
    reqLogin, 
    reqUpdate,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadChatMsg
} from '../api/index'
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

/*
判断socket是否存在，如果存在，则返回，不存在则创建并保存
*/
function initIO(dispatch,userid) {
    if (!io.socket) {
        //连接服务器得到socket对象
        io.socket = io('ws://localhost:4000')   //创建对象之后保存对象
        //绑定监听，接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('接收服务器端发送的消息 ', chatMsg)
            //判断是否与当前用户有关，如果有关则保存
            if (chatMsg.from === userid || chatMsg.to === userid) {
                dispatch(receiveMsg(chatMsg,userid))
            }
        })
    }
}

/*
异步获取消息列表的action
*/
async function getMsgList(dispatch,userid) {
    initIO(dispatch,userid)
    const response = await reqChatMsgList();
    const result = response.data;
    if (result.code === 0) {//获取成功
        const {users,chatMsgs} = result.data;
        //分发一个同步action
        dispatch(receiveMsgList({users,chatMsgs,userid}))
    }
}

/*
发送消息的异步action
*/
export const sendMsg = ({from,to,content}) => {
    return dispatch => {
        console.log('向服务器发送消息 ', {from,to,content})
        //向服务器发送消息
        io.socket.emit('sendMsg',{from,to,content})
    }
}

/*
读取某条消息的action
*/
export const readMsg = (from,to) => {
    return async dispatch => {
        const response = await reqReadChatMsg(from);
        const resoult = response.data;
        if (resoult.code === 0) {//成功
            const count = resoult.data;
            //分发同步ation
            dispatch(msgRead({from,to,count}))
        }
    }
}

//同步成功响应的action
const authSuccess = user => ({type: AUTH_SUCCESS,data: user})
//同步错误消息的action
const errorMsg = msg => ({type: ERROR_MSG,data: msg})
//同步接收用户信息的action
const receiveUser = user => ({type: RECEIVE_USER,data: user})
//同步重置用户信息的action
export const resetUser = msg => ({type: RESET_USER,data: msg})
//同步接收指定userType的所有用户信息的action
const receiveUserList = userList => ({type: RECEIVE_USER_LIST,data: userList})
//同步接收消息列表的action
const receiveMsgList = ({users,chatMsgs,userid}) => ({type: RECEIVE_MSG_LIST,data: {users,chatMsgs,userid}})
//同步接收消息的action
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
//读取了某条消息的同步action
const msgRead = ({from,to,count}) => ({type: MSG_READ,data: {from,to,count}})

/*异步注册用户的action*/
export function register (user) {
    const {username,password,password2,userType} = user;
    //设置前台验证，如果不通过，返回一个errorMsg的action
    if (!username) {
        return  errorMsg('用户名必须输入!')       
    } else if (password !== password2) {
        return errorMsg('两次密码要一致!')
    }
    //表单数据合法，返回一个发ajax请求的异步action函数
    return async dispatch => {
        //发送注册的异步ajax请求，得到响应
        /*const promise = reqRegister(user);
        promise.then(response => {
            const result = response.data;   //{code:0/1,data: user/msg: ''}
        })*/
        const response = await reqRegister({username,password,userType});
        //得到响应体数据
        const result = response.data;   //{code:0/1,data: user/msg: ''}
        if (result.code === 0) {//注册成功
            //获取消息列表
            getMsgList(dispatch,result.data._id)
            //分发成功响应的action，返回的是一个action对象
            dispatch(authSuccess(result.data))
        } else {//注册失败
            //分发失败错误消息的action，返回的是一个action对象
            dispatch(errorMsg(result.msg))
        }
    }
}

/*异步登录用户的action*/
export const login = ({username,password}) => {
    //设置前台验证，如果不通过，返回一个errorMsg的action
    if (!username) {
        return  errorMsg('用户名必须输入!')       
    } else if (!password) {
        return errorMsg('密码必须输入!')
    }
    //表单数据合法，返回一个发ajax请求的异步action函数
    return async dispatch => {
        //发送登录的异步ajax请求，得到响应
        /*const promise = await reqLogin({username,password});
        promise.then(response => {
            const result = response.data;   //{code:0/1,data: user,msg: ''}
        })*/
        const response = await reqLogin({username,password});
        //得到响应数据
        const result = response.data;   //{code:0/1,data: user,msg: ''}
        if (result.code === 0) {//登录成功
            //获取消息列表
            getMsgList(dispatch,result.data._id)
            //分发成功响应的action，返回的是一个action对象
            dispatch(authSuccess(result.data))
        } else {//登录失败
            //分发失败错误消息的action，返回的是一个action对象
            dispatch(errorMsg(result.msg))
        }
    }
}

/*异步更新用户数据的action*/
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdate(user);
        const result = response.data;
        if (result.code === 0) {//更新成功
            dispatch(receiveUser(result.data))
        } else {//更新失败
            dispatch(resetUser(result.msg))
        }
    }

}

/*异步获取用户数据的action*/
export const getUser = () => {
    return async dispatch => {
        const response =  await reqUser();
        const result = response.data;
        if (result.code === 0) {//获取用户信息成功
            //获取消息列表
            getMsgList(dispatch,result.data._id)
            dispatch(receiveUser(result.data))
        } else {//获取用户信息失败
            dispatch(resetUser(result.msg))
        }
    }
}

/*异步获取指定userType的用户信息*/
export const getUserList = (userType) => {
    return async dispatch => {
        const response = await reqUserList(userType);
        const result = response.data;
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}
