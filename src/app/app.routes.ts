import { Routes } from '@angular/router';
import { QuizJoinComponent } from './components/quiz-join/quiz-join.component';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizScoreComponent } from './components/quiz-score/quiz-score.component';
import { HomeComponent } from './components/home/home.component';
import { RulesComponent } from './components/rules/rules.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'rules',
    component: RulesComponent,
  },
  {
    path: 'quiz-join',
    component: QuizJoinComponent,
  },
  {
    path: 'quiz-info',
    component: QuizInfoComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'quiz-score',
    component: QuizScoreComponent,
  },
];
