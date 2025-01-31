import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Quiz1Component } from './quiz1/quiz1.component';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'quiz', component: Quiz1Component },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
