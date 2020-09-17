import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBudgetComponent } from './home-budget/home-budget.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { ReportComponent } from './report/report.component';
import {HttpClientModule} from "@angular/common/http"; //引入HttpClientModule 模块
import {HttpDomainService} from "./services/http-domain.service";
import { BudgetComponent } from './home-budget/budget/budget.component';
import { IncomeComponent } from './home-budget/income/income.component';
import { ExpensesComponent } from './home-budget/expenses/expenses.component';

// import * as echarts from "echarts";
@NgModule({
  declarations: [
    AppComponent,
    HomeBudgetComponent,
    ReportComponent,
    BudgetComponent,
    IncomeComponent,
    ExpensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxEchartsModule.forRoot({echarts:()=>import("echarts"),
  })
  ],
  providers: [HttpDomainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
