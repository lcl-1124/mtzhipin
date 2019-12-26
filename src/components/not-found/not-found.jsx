/*
提示未找到界面路由组件
*/
import React,{Component} from 'react'
import {Button} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class NotFound extends Component{
    render () {
        return (
            <div>
                <div>
                    <h2>抱歉，找不到该页面!</h2>
                    <Button
                        type="primary"
                        onClick={() => this.props.history.replace("/")}
                    >
                        回到首页
                    </Button>
                </div>
            </div>
        )
    }
}

export default withRouter(NotFound)