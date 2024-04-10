import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuzzingComponent } from '@fufe-fuzzing/fuzzing.component';
import { FUZZING_TITLE } from '@fufe-app/app.routing';

const routes: Routes = [
  {
    path: 'ocaml',
    component: FuzzingComponent,
    children: [
      {
        path: ':dir',
        component: FuzzingComponent,
        title: FUZZING_TITLE,
        children: [
          {
            path: ':file',
            component: FuzzingComponent,
            title: FUZZING_TITLE,
          },
        ],
      },
    ],
  },
  {
    path: 'rust',
    component: FuzzingComponent,
    children: [
      {
        path: ':dir',
        component: FuzzingComponent,
        title: FUZZING_TITLE,
        children: [
          {
            path: ':file',
            component: FuzzingComponent,
            title: FUZZING_TITLE,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'ocaml',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuzzingRouting {}
