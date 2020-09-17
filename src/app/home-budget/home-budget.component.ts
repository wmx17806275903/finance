import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { DateTimes } from '../utils/date-time';
import {HttpDomainService} from "../services/http-domain.service";
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-home-budget',
  templateUrl: './home-budget.component.html',
  styleUrls: ['./home-budget.component.css']
})
export class HomeBudgetComponent implements OnInit {
  public title = "HomeBudget";
  public showBar = true;
  public showCategory=true;
  public showExpenseDetail:boolean[]=[false];
  public option;
  public optionPie;
  public budgetUsage;
  public expenseDetail;
  public home:any;
  public clickAdd=false;
  public day : string;
  public available:any;
  public domain:string;
  public categories:object[]=[
    {categroy:"expenses",value:2},
    {categroy:"budget",value:3},
    {categroy:"income",value:4}
  ];
  public details:object[]=[
    {category:"Rent",insideItems:[{category:"Mortage",value:"$1700"}],value:"$1700"},
    {category:"utilitiest",insideItems:[{category:"Electricity",value:"$300"},{category:"Water",value:"$100"}],value:"$211"}
  ];

  constructor(public httpDomain:HttpDomainService){
    this.domain=httpDomain.domain;//can use for add img.
  }

  ngOnInit(): void {
    this.day=DateTimes.format(new Date(),'yyyy-MM-dd');

    var api_expense="expenses/details";
    var xData:any[] = [];
    var yData:any[] = [];
    const xy: any[] = [];
    this.httpDomain.get(api_expense).then((response)=>{
      this.expenseDetail=response;
      for(var i=0;i<this.expenseDetail.length;i++){
        xy.push({ name: this.expenseDetail[i]["categoryName"], value: this.expenseDetail[i]["totalValue"] });
        xData.push(this.expenseDetail[i]["categoryName"]);
        yData.push(this.expenseDetail[i]["totalValue"]);
      }
    })
    var api_home="/home"
    this.httpDomain.get(api_home).then((response)=>{
      this.home=response;
      var budgetValue;
      var expValue;
      for(var i=0;i<this.home.length;i++){
        if(this.home[i]['name']=="budget"){
          budgetValue=this.home[i].value;
        }
        if(this.home[i]['name']=="expenses"){
          expValue=this.home[i].value;
        }
      }
      this.available=budgetValue-expValue;
    })
    this.budgetUsage = {
      series: [
        {
            name: 'Budget',
            type: 'gauge',
            center:['50%', '40%'],
            axisLine: {
	            lineStyle: {//仪表盘轴线相关配置。
	                width:5,
	            }
	        },
	        splitLine: {//分隔线样式相关
	            length: 10,//分割线的长度
	            lineStyle: {
	                width:1,
	                color:'#b0b3b8'
	            }
	        },
          data: [{value: 10, name: '%'}],
	        detail: {//仪表盘详情数据相关
	            textStyle: {
                    color: '#5bdbff',
                    fontSize:16,
                    offsetCenter: [0,'80%']
               }
	        },

	        pointer:{//指针长度与宽度
	            width:3,
	            length:'85%'
	        },
        }
    ]
    };
  }
  handleVisibleRent(e) {
    if(this.showExpenseDetail[e]) {
      this.showExpenseDetail[e] = false
    }else {
      this.showExpenseDetail[e] = true
    }
  }
  isBar() {
    this.showBar = true;
  }
  isPie() {
    this.showBar=false;
  }
  isCategory(){
    this.showCategory=true;
  }
  isDate(){
    this.showCategory=false;
  }
  keyUp(){
    // this.clickAdd=true;
    let newData = {categroy:"expenses",value:2};
    this.categories.push(newData)
  }
  showExpensesDetail(e){
    this.showExpenseDetail[e]=true;
  }
  insertItem(){
    let newData = {categroyName:""};
    this.expenseDetail.push(newData)
  }
  deleteItem(i){
    this.expenseDetail.splice(i)
  }
}
