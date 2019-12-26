/*
包含多个工具类的模块
*/
/*
得到需要跳转的页面
用户主页面
    boos：'/boos'
    dalao；'/dalao'
用户完善信息页面
    boos： '/boosinfo'
    dalao: '/dalaoinfo'
//1.判断用户类型：userType值是dalao还是boos
2.判断用户是否完善信息：user.header是否设置
*/
export function redirectPath(userType,header) {
    let path = '';  //初始化path
    //判断是否设置header
    if (!header) {   //没有设置
        path = `/${userType}info`;
    } else {    //有设置
        path = `/${userType}`;
    }
    return path
}