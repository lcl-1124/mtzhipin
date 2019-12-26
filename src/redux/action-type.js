/*
包含多个action type名称常量模块
*/

export const AUTH_SUCCESS = 'auth_success'; //注册/登录成功
export const ERROR_MSG = 'error_msg';   //错误请求信息  请求前/请求后
export const RECEIVE_USER = 'receive_user'  //接收用户
export const RESET_USER = 'reset_user' //重置用户
export const RECEIVE_USER_LIST = 'receive_user_list'//接收指定userType的用户信息
export const RECEIVE_MSG_LIST = 'receive_msg_list'//接收当前用户相关的所有消息列表
export const RECEIVE_MSG = 'receive_msg' //接收一条消息
export const MSG_READ = 'msg_read'  //读取了某条消息