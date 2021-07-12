import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },{
      path: 'posts',
      component: PostsComponent
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }
];


@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class PagesRoutingModule { }

