import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Collection } from './collection';
import { Home } from './home';


export const routes: Routes = [
    {
        path: '',
        title: 'Tasks',
        component: Home,
    },
    {
        path: 'collection',
        title: 'Collection',
        component: Collection,
    },
];
