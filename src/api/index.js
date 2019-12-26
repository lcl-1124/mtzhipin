/*
包含多个接口请求函数的模块
    调用ajax函数向后台发送请求
*/

import ajax from './ajax'

//用户注册请求
export const reqRegister = user => ajax('/register',user,'POST');

//用户登录请求
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST');

//用户更新请求
export const reqUpdate = user => ajax('/update',user,'POST');

//获取用户信息
export const reqUser = () => ajax('/user');

//获取指定userType的用户信息    userType需要封装成对象
export const reqUserList = (userType) => ajax('/userlist',{userType});

//获取当前用户的所有聊天记录
export const reqChatMsgList = () => ajax('/msglist')

//标识聊天消息为已读
export const reqReadChatMsg = (from) => ajax('/readmsg',{from},'POST')