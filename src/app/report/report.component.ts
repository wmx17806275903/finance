import { Component, OnInit } from '@angular/core';
import { HttpDomainService } from "../services/http-domain.service";
// import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public home;
  public option;
  expenseDetail: any;
  public expenseRepostList: Object[] = [];
  constructor(public httpDomain: HttpDomainService) { }

  ngOnInit(): void {
    var api_home = "/home"
    this.httpDomain.get(api_home).then((response) => {
      this.home = response;
    })
    var api_expense = "expenses/details";
    var xData: any[] = [];
    var yData: any[] = [0];
    var maxDate = 0;
    this.httpDomain.get(api_expense).then((response) => {
      this.expenseDetail = response;
      // console.log(this.expenseDetail)
      for(let i=0;i<this.expenseDetail.length;i++) {
        for(let j=0;j<this.expenseDetail[i].expenseItems.length;j++){
          this.expenseRepostList.push(this.expenseDetail[i].expenseItems[j]);
        }
      }
      for (var i = 0; i < this.expenseDetail.length; i++) {
        xData.push(this.expenseDetail[i]["categoryName"]);
        yData.push(this.expenseDetail[i]["totalValue"]);
        if (this.expenseDetail[i]['totalValue'] > maxDate) maxDate = this.expenseDetail[i]['totalValue']
      }
    })
    var dataAxis = xData;
    var data = yData;
    var yMax = maxDate;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
    this.option = {
      title: {
        text: 'Expenses',
        subtext: 'Personal Finance Manager: Expenses Manager'
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          textStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            color: '#3399FF'
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false
        },
        {
          type: 'bar',
          itemStyle: {
            color: { offset: 1, color: '#18Cdf0' }
          },
          emphasis: {
            itemStyle: {
              color: { offset: 0, color: '#2378f7' },
            }
          },
          data: data
        }
      ]
    };

  }
}
