import { Component, inject } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Quiz, QuizResult } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-info',
  standalone: true,
  imports: [],
  templateUrl: './quiz-info.component.html',
  styleUrl: './quiz-info.component.css',
})
export class QuizInfoComponent {
  testService = inject(TestService);
  quizInfo!: Quiz;
  router = inject(Router);
  quizResult!: QuizResult;

  ngOnInit() {
    this.quizResult = this.testService.quizResult;

    let quizId = this.quizResult.quizId;
    this.testService.getQuizById(quizId).subscribe((quiz) => {
      this.quizInfo = quiz;
    });
  }

  start() {
    this.router.navigateByUrl('/quiz');
  }
}
