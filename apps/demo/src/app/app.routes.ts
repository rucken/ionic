import { Routes } from '@angular/router';
import { GroupsPageRoutes } from './pages/groups-page/groups-page.routes';
import { HomePageRoutes } from './pages/home-page/home-page.routes';
import { ProfilePageRoutes } from './pages/profile-page/profile-page.routes';
import { UsersPageRoutes } from './pages/users-page/users-page.routes';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './pages/home-page/home-page.module#HomePageModule',
        data: HomePageRoutes[0].data
    },
    {
        path: 'users',
        loadChildren: './pages/users-page/users-page.module#UsersPageModule',
        data: UsersPageRoutes[0].data
    },
    {
        path: 'groups',
        loadChildren: './pages/groups-page/groups-page.module#GroupsPageModule',
        data: GroupsPageRoutes[0].data
    },
    {
        path: 'profile',
        loadChildren: './pages/profile-page/profile-page.module#ProfilePageModule',
        data: ProfilePageRoutes[0].data
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
