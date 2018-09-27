import { Routes } from '@angular/router';
import { TodayTaskComponent } from 'src/app/today-task/today-task.component';
import { MonthlyTaskComponent } from 'src/app/monthly-task/monthly-task.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'today', pathMatch: 'full'},
    { path: 'today', component: TodayTaskComponent },
    { path: 'monthly', component: MonthlyTaskComponent },
];