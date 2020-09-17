import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeBudgetComponent } from './home-budget/home-budget.component';
import { ReportComponent } from './report/report.component';
import { BudgetComponent } from './home-budget/budget/budget.component';
import { IncomeComponent } from './home-budget/income/income.component';
import { ExpensesComponent } from './home-budget/expenses/expenses.component';

const routes: Routes = [
  {
    path:"home",component:HomeBudgetComponent,
    children:[
      {path:"expenses",component:ExpensesComponent},
      {path:"budget",component:BudgetComponent},
      {path:"income",component:IncomeComponent},
      {path:"**",redirectTo:"expenses"}
    ]
  },
  {path:"report",component:ReportComponent},
  
  {path:"**",redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
