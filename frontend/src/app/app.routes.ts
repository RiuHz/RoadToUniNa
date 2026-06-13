import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Leaderboard } from './leaderboard/leaderboard';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { MatchHistory } from './match-history/match-history';
import { Match } from './match/match';
import { authorizationGuard } from './guards/auth/authorization.guard';
import { MatchInfo } from './match-info/match-info';

export const routes: Routes = [
    {
        path: 'home',
        title: 'RoadToUniNa',
        component: Homepage
    },
    {
        path: 'leaderboard',
        title: 'Classifiche | RoadToUniNa',
        component: Leaderboard
    },
    {
        path: 'match-history',
        title: 'Storico Partite | RoadToUniNa',
        component: MatchHistory
    },
    {
        path: 'match',
        title: 'Partita | RoadToUniNa',
        component: Match,
        canActivate: [authorizationGuard]
    },
    {
        path: 'match/:id',
        component: MatchInfo
    },
    {
        path: 'login',
        title: 'Login | RoadToUniNa',
        component: Login
    },
    {
        path: 'signup',
        title: 'Sign up | RoadToUniNa',
        component: Signup
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
