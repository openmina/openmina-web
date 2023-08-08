import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TRACING_TITLE } from '@ocfe-app/app.routing';
import { TracingBlocksComponent } from '@ocfe-tracing/tracing-blocks/tracing-blocks.component';

const routes: Routes = [
  {
    path: '',
    component: TracingBlocksComponent,
    children: [
      {
        path: ':hash',
        component: TracingBlocksComponent,
        title: TRACING_TITLE,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracingBlocksRouting {}
