import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Collection } from './collection';
import { Home } from './home';


export const routes: Routes = [
    {
        path: 'home',
        title: 'App Home Page',
        component: Home,
    },
    {
        path: 'collection',
        title: 'Collection Page',
        component: Collection,
    },
];
