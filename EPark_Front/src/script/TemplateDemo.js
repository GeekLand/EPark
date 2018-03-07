import {Input ,Button ,Select ,Row ,Col ,Form ,Popconfirm ,message ,Table ,Modal ,DatePicker ,InputNumber ,Icon} from "antd";
import React from "react";
import Request from "./util/Request";
import CookieUtil from './util/CookieUtil';

const FormItem = Form.Item;
const Option = Select.Option;

class TemplateDemo extends React.Component{
	state={
		//table的显示列
		columns:[],	
		//table的数据
		datas:[],
		//当前页
		currentPage: 1,
		//每页显示条数
        pageSize: 10,
        //数据总条数
        total: 0,

        //筛选条件
        condition:{
        	conStorageId:'',
        	conDate:'',
        },
        //仓库列表
        storages:[],
	}

	//页面组件渲染后完成数据初始化
	componentDidMount(){
		let resultData = Request.synPost('storage/listAll');
		let storages = resultData.datas;
		this.setState({
			storages:this.convertStoragesValueLabel(storages),
		});
	}

	handlePageChange(page, pageSize){
		this.handleSearch(page,pageSize);
	}

	handleSearch(page, pageSize){
		
	}

	changeCondition(obj){
		let condition = this.state.condition;
		condition = Object.assign(condition,obj);
		this.setState({
			condition:condition
		});
	}

	convertStoragesValueLabel(item){
		for(let e of item){
			e.key = e.id;
			e.value = e.id;
			e.label = e.storageName;
		}
		return item;
	}

	render(){
		const formItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
		};

		return(
			<div className="antd-layout-ReturnTracking">
				<Row>
					<Col span={6}>
						<FormItem
							label="接收方"
							{...formItemLayout}
						>
							<Select
								style={{'width':'90px'}}
								onChange={(value)=>{
	                                    this.changeCondition({
	                                        conStorageId:value,
	                                    });
	                                }}
	                            value={this.state.condition.conStorageId}
							>
								<Option value="">请选择</Option>
								{(()=>{
									return this.state.storages.map((item,index)=>{
										return  (
	                                            <Option key={index} value={item.value+""}>{item.label}</Option>
	                                        );
									});
								})()}
							</Select>
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem
							label="日期"
							{...formItemLayout}
						>
							<DatePicker
								onChange={
									(dates, dateStrings)=>{
										this.changeCondition({
											conDate:dateStrings
										});
									}
								}
							/>
						</FormItem>
					</Col>
				</Row>

				<Table
	                columns={this.state.columns}
	                dataSource={this.state.datas}
	                pagination={{
	                    current: this.state.currentPage,
	                    pageSize: this.state.pageSize,
	                    total: this.state.total,
	                    onChange: (page, pageSize)=> {
	                        this.handlePageChange(page, pageSize)
	                    },
	                    showTotal: (total, range)=>{
	                        const pageSize = this.state.pageSize;
	                        const totalPage = Math.ceil(Number(total)/Number(pageSize));
	                        return `共${totalPage}页 / 共${total}条`;
	                    }
	                }}
	            />	
            </div>
		);
	}
}

export default TemplateDemo;