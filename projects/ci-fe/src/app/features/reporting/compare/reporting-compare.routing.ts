import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportingCompareComponent } from '@cife-reporting/compare/reporting-compare.component';

const routes: Routes = [
  {
    path: '',
    component: ReportingCompareComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportingCompareRouting {}
