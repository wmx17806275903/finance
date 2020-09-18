import { Component, OnInit } from '@angular/core';
import { HttpDomainService } from 'src/app/services/http-domain.service';
import { DateTimes } from '../../utils/date-time';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  public income: any;
  public expenseDetail: any;
  public showBar = true;
  public showCategory = true;
  public showExpenseDetail: boolean[] = [false];
  public option;
  public optionPie;
  public budgetUsage;
  public home: any;
  public day: any;
  public clickAdd = false;
  public categories: object[] = [];
  available: any;
  newexpenseDetail: any;
  public header: string = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36";

  constructor(public httpDomain: HttpDomainService) { }

  ngOnInit(): void {
    this.day = DateTimes.format(new Date(), 'yyyy-MM-dd');

    var budgetBalance: number = 0;
    const balance: any[] = [];
    var xData: any[] = [];
    var yData: any[] = [];
    const xy: any[] = [];

    this.httpDomain.get("income/details").then(response=>{
      this.income = response;
      console.log(this.income)
      for (var i = 0; i < this.income.length; i++) {
        xData=this.income[i]['date'];
        yData=this.income[i]['value'];
        xy.push({ name: this.income[i]["date"], value: this.income[i]["value"] });
      }
      console.log("income")
      console.log(xData)
    })
    
    // 3rd column: Expenses-detail
    var api_expense = "expenses/details";
    this.httpDomain.get(api_expense).then((response) => {
      this.expenseDetail = response;      
    })

    //1st column: Menu bar
    var api_home = "/home"
    this.httpDomain.get(api_home).then((response) => {
      this.home = response;
      var budgetValue;
      var expValue;
      for (var i = 0; i < this.home.length; i++) {
        if (this.home[i]['name'] == "budget") {
          budgetValue = this.home[i].value;
        }
        if (this.home[i]['name'] == "expenses") {
          expValue = this.home[i].value;
        }
      }
      this.available = budgetValue - expValue;
      if (this.available < 0) {
        budgetBalance = 0;
      } else {
        budgetBalance = (this.available / budgetValue) * 100;
      }
      balance.push({ value: budgetBalance, name: '%' })
    })

    //2nd column: bar chart
    this.option = {
      tooltip: {},
      legend: {
        data: ['income']
      },
      xAxis: {
        data: xData//["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: 'income',
        type: 'bar',
        itemStyle: {
          color: '#3399FF',
        },
        data: yData,//[5, 20, 36, 10, 10, 20]
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(00, 00, 00, 0.8)'
        }
      }]
    };
    //2nd column: pie chart
    this.optionPie = {
      title: {
          text: 'HomeBudget',
          subtext: 'Income',
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
          left: 'center',
          top: 'bottom',
          data:xData,// ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
      },
      toolbox: {
          show: true,
          feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                  show: true,
                  type: ['pie']
              },
              restore: {show: true},
              saveAsImage: {show: true}
          }
      },
      series: [
          {
              name: 'Income',
              type: 'pie',
              radius: [20, 110],
              roseType: 'radius',
              label: {
                  show: false
              },
              emphasis: {
                  label: {
                      show: true
                  }
              },
              data: xy
          },
      ]
    };
    //1st col: dashboard
    this.budgetUsage = {
      series: [
        {
          name: 'Budget',
          type: 'gauge',
          center: ['50%', '40%'],
          axisLine: {
            lineStyle: {//仪表盘轴线相关配置。
              width: 5,
            }
          },
          splitLine: {//分隔线样式相关
            length: 10,//分割线的长度
            lineStyle: {
              width: 1,
              color: '#b0b3b8'
            }
          },
          data: balance,
          detail: {//仪表盘详情数据相关
            textStyle: {
              color: '#5bdbff',
              fontSize: 16,
              offsetCenter: [0, '80%']
            }
          },
          pointer: {//指针长度与宽度
            width: 3,
            length: '85%'
          },
        }
      ]
    };
  }
  //3rd col: visible or not each item
  handleVisibleRent(e) {
    if (this.showExpenseDetail[e]) {
      this.showExpenseDetail[e] = false
    } else {
      this.showExpenseDetail[e] = true
    }
  }
  showExpensesDetail(e) {
    this.showExpenseDetail[e] = true;
  }

  isBar() {
    this.showBar = true;
  }
  isPie() {
    this.showBar = false;
  }
  isCategory() {
    this.showCategory = true;
  }
  isDate() {
    this.showCategory = false;
  }
  //3rd: Add new item in the expense category
  keyUp(index) {
    // this.clickAdd=true;
    let newData = { bill: false, categoryName: "test", date: '', description: "test", paid: false, value: 2 };
    this.expenseDetail[index].expenseItems.push(newData);
    this.httpDomain.put("expenses/add_expense",newData)

  }

  addItem(e) {
    this.showExpenseDetail[e] = true;
  }

  insertItem() {
    var api_putExpense = "expenses/add_expense";
    let t=[
      {
        categoryName:"test",
        expensesDetail:{expenseDetail:{bill:false,categroyName:"test",date:'',description:"test",paid:false,value:2}},
        totalValue:0
      }
    ];
    this.expenseDetail.push(t)
    this.httpDomain.put(api_putExpense,t).then((response)=>{
      this.newexpenseDetail=response;
      console.log(this.newexpenseDetail)
    })
  }
  deleteIncomeItem(i) {
    window.event.returnValue=false;
    let data = this.income[i];
    this.httpDomain.delete("income/delete_income", data).then(res => {
      console.log(res);
    })
    this.income.splice(i,1);
  }
}

