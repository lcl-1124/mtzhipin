/*
使用axios封装的ajax请求函数
    返回的是promise对象
*/

import axios from 'axios'

export default function ajax (url,data={},type='GET') {
    //判断用户要发送什么类型的请求
    if (type === 'GET') {//发送get请求
        /*
        将data参数拼接到url后
            data参数：{useranme: xxx,password: yyy}
            拼接后： username=xxx&password=yyy
        */
        let paramStr = '';
        Object.keys(data).forEach(key => {
            paramStr += `${key}=${data[key]}&`;
        })
        //如果拼串，清除最后一个&
        if (paramStr) {
          paramStr = paramStr.substring(0,paramStr.length-1)  
          //添加到url后
          url += "?" + paramStr;
        }
        return axios.get(url)
    } else {//发送post请求
        return axios.post(url,data)
    }
}