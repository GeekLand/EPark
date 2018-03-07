import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import Particle from 'zhihu-particle';
import Request from './util/Request';
import $ from 'jquery';
import CookieUtil from './util/CookieUtil';
const FormItem = Form.Item;

class LoginForm extends React.Component {

    setCookie(json) {
        const {name, role, id, account, password} = json;
        document.cookie = `name=${encodeURIComponent(name)};max-age=${7*24*60*60}`;
        document.cookie = `role=${encodeURIComponent(role)};max-age=${7*24*60*60}`;
        document.cookie = `id=${encodeURIComponent(id)};max-age=${7*24*60*60}`;
        document.cookie = `account=${encodeURIComponent(account)};max-age=${7*24*60*60}`;
        document.cookie = `password=${encodeURIComponent(password)};max-age=${7*24*60*60}`;
    }

    getCookie(name) {
        let arr;
        const reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return decodeURIComponent(arr[2]);
        } else {
            return null;
        }
    }

    delCookie(name) {
        var value = this.getCookie(name);
        if(value){
            document.cookie= name + "="+value+";max-age=0";
        }
    }

    componentDidMount(){
        const username = this.getCookie('account');
        const password = this.getCookie('password');
        if(username && password){
            this.props.form.setFieldsValue({
                username,
                password,
            });
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                $.ajax({
                    type: 'POST',
                    data: {account: values.account.toUpperCase().trim(),password: values.password.trim()},
                    dataType: 'jsonp',
                    url: Request.getBaseUrl()+'user/find',
                    success: (response)=>{
                        if(response.code === '200' && response.data){
                            const rMap = response.data;
                            if(rMap.result == "success"){
                                let userData = rMap.data;
                                if(userData){
                                    this.setCookie({
                                        name: userData.name,
                                        id: userData.id,
                                        account: userData.account,
                                        password: userData.password,
                                    });

                                    switch(0){
                                        case '0':
                                        case '客服主管':
                                            this.props.changeRoute(null,'App');
                                            break;
                                        case '运营':
                                            this.props.changeRoute(null,'App/PackageList');
                                            break;
                                        case '技师':
                                            this.props.changeRoute(null,'App/BillList');
                                            break;
                                        case '技师主管':
                                            document.cookie = `regionId=${encodeURIComponent(userData.regionId)};max-age=${7*24*60*60}`;
                                            this.props.changeRoute(null,'App/BillList');
                                            break;
                                        case '仓管':
                                            this.props.changeRoute(null,'App/Fitting');
                                            break;
                                        case '服务总监':
                                            this.props.changeRoute(null,'App/Service');
                                            break;
                                        case'供应商':
                                            this.props.changeRoute(null,'App/StorageOrder');
                                            break;
                                        case'审核员':
                                            this.props.changeRoute(null,'App/StorageOrder');
                                            break;

                                    }
                                }
                            }else{
                                message.error(rMap.info);
                            }   
                        }else{

                        }
                            

                            
                    },
                    error: (err)=>{
                        throw err;
                    }
                });
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                    {
                        getFieldDecorator('account',{
                            rules: [
                                {required: true, message: '请输入用户名'}
                            ]
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('password',{
                            rules: [
                                {required: true, message: '请输入密码'}
                            ]
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                   type="password"
                                   placeholder="密码"
                            />
                        )
                    }
                </FormItem>
                <FormItem>
                    {/*<Checkbox>记住登录</Checkbox>*/}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" className="login-form-button">
                        注册
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const LoginClass = Form.create()(LoginForm);

class Login extends React.Component {

    state = {};

    componentDidMount(){
        new Particle(document.getElementById('canvasDiv'), {
            atomColor: '#E4E5E6',
            interactive: false,
            density: 'medium',
        });
    }

    render() {
        return (
            <div style={{width:'100%', height:'100%'}}>
                <div className="LoginCenter">
                    <div className="LoginTitle">
                        <h1>e乐泊</h1>
                    </div>
                    <div>
                        <LoginClass changeRoute={this.props.history.pushState} />
                    </div>
                </div>
                <div id="canvasDiv" style={{width:'100%', height:'100%'}}></div>
            </div>
        );
    }
}

export default Login;
