/*
头像选择器组件
*/
import React from 'react'
import {List,Grid} from 'antd-mobile'   //引入蚂蚁金服UI组件包
import PropTypes from 'prop-types'

export default class HeaderSelector extends React.Component{
    //props限制
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    state = {
        icon: ''    //标识头像是否选择
    }
    //组件类的构造函数
    constructor (props) {
        //准备需要显示的列表
        super(props)
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: '头像' + (i+1),
                icon: require(`../../assets/images/头像${i+1}.png`) //不能使用import
            })    
        }
    }

    //选择头像监听
    selectHeader = ({icon,text}) => {//结构赋值拿到头像地址和描述
        //更新自身组件
        this.setState({
            icon
        })
        //更新父组件state
        this.props.setHeader(text)
    }
    render () {
        const {icon} = this.state;
        //头部提示栏
        const listHeader = !icon ? '请选择头像' : (
            <p>
                头像设置为：
                <img src={icon} alt="header"/>
            </p>
        )
        return (
            <div>
                <List renderHeader={() => listHeader}>
                    <Grid data={this.headerList} columnNum={5} onClick={this.selectHeader}/>
                </List>
            </div>
        )
    }
}