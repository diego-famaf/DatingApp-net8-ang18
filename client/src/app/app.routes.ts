import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate:[authGuard],
        children:[
            {path:'miembros',component:MemberListComponent},
            {path:'miembros/:id',component:MemberDetailComponent},
            {path:'listas',component:ListsComponent},
            {path:'mensajes',component:MessagesComponent},
        ]
    },   
    {path:'**',component:HomeComponent,pathMatch: 'full'},    
];
