import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingToolScenariosComponent } from '@rufe-testing-tool/scenarios/testing-tool-scenarios.component';

const routes: Routes = [
  {
    path: '',
    component: TestingToolScenariosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestingToolScenariosRouting { }
