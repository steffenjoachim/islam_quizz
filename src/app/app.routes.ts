import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { GameMainPageComponent } from './game/game-main-page/game-main-page.component';

export const routes: Routes = [
    {path: '', component: LandingpageComponent},
    {path: 'quiz', component: GameMainPageComponent},
];
