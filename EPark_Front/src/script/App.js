import {Layout, Menu, Icon, Button, Popconfirm, Form, Input, message} from 'antd';
import {Link} from "react-router";
import React from "react";
import CookieUtil from './util/CookieUtil';
import Request from "./util/Request";
const {Header, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;

const functionLinks = [
    {link:'/App/OrderList',iconType:'user',name:'服务工单'}, // 0
    {link:'/App/PackageList',iconType:'gift',name:'产品'},
    {link:'/App/PackageSale',iconType:'filter',name:'渠道'},
    {link:'/App/Fitting',iconType:'tool',name:'配件'},
    {link:'/App/Service',iconType:'customer-service',name:'服务'},
    {link:'/App/BillList',iconType:'bars',name:'收单列表'}, // 5
    {link:'/App/RunningStock',iconType:'car',name:'常备库'},
    {link:'/App/TodayStock',iconType:'shopping-cart',name:'今日库'},
    {link:'/App/FittingOption',iconType:'setting',name:'仓库配置'},
    {link:'/App/RegionServerLimitSetting',iconType:'setting',name:'服务量设置'},
    {link:'/App/PartProvider',iconType:'setting',name:'供应商管理'}, // 10
    {link:'App/Storage',iconType:'setting',name:'仓库管理'},
    {link:'App/StorageTransfer',iconType:'setting',name:'物料转移'},
    {link:'App/StorageOrder',iconType:'setting',name:'订单管理'},
    {link:'App/StorageStock',iconType:'setting',name:'库存管理'},
    {link:'App/TechnicianDailySettlement',iconType:'schedule',name:'技师每日结算'}, //15
    {link:'App/ReturnTracking',iconType:'schedule',name:'物料跟踪'},
    {link:'App/TechDispatch',iconType:'schedule',name:'技师调派'},
    {link:'App/TechSaleLog',iconType:'schedule',name:'技师销售查询'},
];

//content标签中的表格
//这里是表格的列，columns数组中的一个JSON对象就是一列

//搭载的页面的整体布局
class App extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',
        links: [],

        newpass1:'',
        newpass2:'',
        modifyPassVisible:false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }

    componentDidMount() {
        let role = CookieUtil.getCookie('role');
        let links = [];
        switch(role) {
            case '客服':
                links = [
                    functionLinks[0],
                ];
                break;
            case '运营':
                links = [
                    functionLinks[0],
                    functionLinks[1],
                    functionLinks[2],
                ];
                break;
            case '技师':
                links = [
                    functionLinks[5],
                    functionLinks[15],
                    functionLinks[18],
                ];
                break;
            case '仓管':
                links = [
                    functionLinks[3],
                    functionLinks[8],
                    functionLinks[10],
                    functionLinks[11],
                    functionLinks[12],
                    functionLinks[13],
                    functionLinks[14],
                ];
                break;
            case '客服主管':
                links = [
                    functionLinks[0],
                    functionLinks[9],
                ];
                break;
            case '技师主管':
                links = [
                    functionLinks[3],
                    functionLinks[5],
                    functionLinks[6],
                    functionLinks[7],
                    functionLinks[9],
                    functionLinks[13],
                    functionLinks[14],
                    functionLinks[15],
                    functionLinks[17],
                    functionLinks[18],
                ];
                break;
            case '服务总监':
                links = [
                    functionLinks[0],
                    functionLinks[4],
                    functionLinks[5],
                    functionLinks[6],
                    functionLinks[7],
                    functionLinks[9],
                    functionLinks[13],
                    functionLinks[14],
                    functionLinks[15],
                ];
                break;
            case '供应商':
                links=[
                    functionLinks[3],
                    functionLinks[13],
                    functionLinks[16],
                ];
                break;
            case '审核员':
                links=[
                    functionLinks[3],
                    functionLinks[6],
                    functionLinks[7],
                    functionLinks[8],
                    functionLinks[10],
                    functionLinks[11],
                    functionLinks[14],
                    functionLinks[15],
                ];
                break;
        }
        let loginId = CookieUtil.getCookie('id');
        
        let pageDatas = Request.synPost("/storage/listAll",{});
        let storages = pageDatas.datas;
        for(let item of storages){
            if(item.directorId === loginId && role !== "仓管" && role !== "客服主管"){
                links.push(functionLinks[12]);
                links.push(functionLinks[13]);
            }
        }    
        this.setState({links});
    }

    quitAccount(){
        this.props.history.pushState('/');
        CookieUtil.delCookie('name');
        CookieUtil.delCookie('role');
        CookieUtil.delCookie('id');
        CookieUtil.delCookie('regionId');
    }

    modifyPasword(){
        let id = CookieUtil.getCookie('id');
        let pass1 = this.state.newpass1;
        let pass2 = this.state.newpass2;
        if(pass1 && pass1 === ''){
            message.warning("请输入新密码。");
            return ;
        }
        if(pass2 && pass2 === ''){
            message.warning("请再次输入新密码。");
            return ;
        }
        if(pass1 !== pass2){
            message.warning("两次输入不一致。");
            return ;
        }

        let result = Request.synPost('user/modifyPasword',{id:id,newPass:pass1});

        if(result === "success"){
            message.info("密码修改成功。");
        }else{
            message.warning("修改失败。");
        }
        
    }

    render() {
        let key = '';
        const pathName = window.location.hash.match(/#\/([a-zA-Z/]+)(\?.+|$)/);
        if(pathName){
            key = pathName[1];
        }
        switch(key){
            case 'App':
                key = '1';
                break;
            case 'App/PackageList':
                key = '2';
                break;
            case 'App/PackageSale':
                key = '3';
                break;
            case 'App/Fitting':
                key = '4';
                break;
            case 'App/Service':
                key = '5';
                break;
            case 'App/BillList':
                key = '6';
                break;
            case 'App/RunningStock':
                key = '7';
                break;
            case 'App/TodayStock':
                key = '8';
                break;
            case 'App/FittingOption':
                key = '9';
                break;
        }
        let items = this.state.links.map((item,index)=>{
            return (
                <Menu.Item key={index}>
                    <Link to={item.link}>
                        <Icon type={item.iconType} />
                        <span className="nav-text">{item.name}</span>
                    </Link>
                </Menu.Item>
            );
        });

        const modifyForm = (
            <Form>
                <div style={{fontSize: '14px', marginBottom: '15px'}}>
                    <span>密码修改</span>
                </div>
                <FormItem
                    label="新密码"
                    labelCol={{span:8}}
                    wrapperCol={{span:16}}
                >
                    <Input value={this.state.newpass1} onChange={(e)=>{
                        this.setState({
                            newpass1:e.target.value,
                        });
                    }}
                    />
                </FormItem>
                <FormItem
                    label="再次输入"
                    labelCol={{span:8}}
                    wrapperCol={{span:16}}
                >
                    <Input value={this.state.newpass2} onChange={(e)=>{
                        this.setState({
                            newpass2:e.target.value,
                        });
                    }}/>
                </FormItem>
            </Form>
        );

        return (
            <Layout>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"/>
                    <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={[key]}>
                        {items}
                        {/*<Menu.Item key="1">
                            <Link to="/App">
                                <Icon type="user"/>
                                <span className="nav-text">服务工单</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/App/PackageList">
                                <Icon type="gift" />
                                <span className="nav-text">产品</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/App/PackageSale">
                                <Icon type="filter" />
                                <span className="nav-text">渠道</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/App/Fitting">
                                <Icon type="tool" />
                                <span className="nav-text">配件</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/App/Service">
                                <Icon type="customer-service" />
                                <span className="nav-text">服务</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/App/BillList">
                                <Icon type="bars" />
                                <span className="nav-text">收单列表</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/App/RunningStock">
                                <Icon type="car" />
                                <span className="nav-text">常备库</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/App/TodayStock">
                                <Icon type="shopping-cart" />
                                <span className="nav-text">今日库</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Link to="/App/FittingOption">
                                <Icon type="setting" />
                                <span className="nav-text">仓库配置</span>
                            </Link>
                        </Menu.Item>*/}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0, position:'relative'}}>
                        <span style={{marginLeft: "15px",fontSize:'17px'}}>优典养车</span>
                        <div style={{position:'absolute',right:'15px',top:0}}>
                            <span style={{fontSize:'13px'}}>{CookieUtil.getCookie('role')+'：'+CookieUtil.getCookie('name')}</span>
                            <Popconfirm
                                title="确认退出 ？"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={()=>{this.quitAccount()}}
                                onCancel={()=>{console.log('cancel')}}
                            >
                                <Button style={{marginLeft:'20px'}} type="primary">退出</Button>
                            </Popconfirm>
                            <Popconfirm
                                title={modifyForm}
                                okText="确定"
                                cancelText="取消"
                                onConfirm={()=>{this.modifyPasword()}}
                                onCancel={()=>{
                                    this.setState({
                                        newpass1:'',
                                        newpass2:'',
                                    });
                                }}
                            >
                                <Button type="primary">修改密码</Button>                               
                            </Popconfirm>
                            
                        </div>
                    </Header>
                    <div className="ant-layout-content">
                        {this.props.children}
                    </div>
                </Layout>
            </Layout>
        );
    }
}

export default App;