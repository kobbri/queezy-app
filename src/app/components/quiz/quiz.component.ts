import { Component, inject } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Question, Quiz, QuizResult } from '../../types';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [MatRadioModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  testService = inject(TestService);
  router = inject(Router);
  questions: Question[] = [];
  quizInfo!: Quiz;
  quizResult!: QuizResult;
  currentQuestionNumber: number = 0;

  ngOnInit() {
    this.quizResult = this.testService.quizResult;

    this.testService.getQuestions().subscribe((results) => {
      this.questions = results;
    });
    this.testService.getQuizById(this.quizResult.quizId).subscribe((result) => {
      this.quizInfo = result;
    });
  }

  get currentQuestion() {
    let questionId = this.quizInfo.questions[this.currentQuestionNumber];
    return this.questions.find((x) => x.id == questionId);
  }

  currentSelectedOptionId: string = '';

  next() {
    this.quizResult.response?.push({
      questionId: this.currentQuestion!.id,
      answerOptionId: this.currentSelectedOptionId,
    });
    this.currentQuestionNumber++;
    this.currentSelectedOptionId = '';
  }

  submit() {
    this.next();
    this.calculateResult();
    this.testService
      .updateQuizResult(this.quizResult.id!, this.quizResult)
      .subscribe();
    this.router.navigateByUrl('quiz-score');
  }

  calculateResult() {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unattempt = 0;
    let percentage = 0;
    let totalMark = 0;

    this.quizResult.response?.forEach((response) => {
      let questionId = response.questionId;
      let selectedOptionId = response.answerOptionId;
      let question = this.questions.find((x) => x.id == questionId);
      let correctOption = question?.options.find((x) => x.isCorrect == true);
      totalMark += question!.marks;

      if (!selectedOptionId) {
        unattempt++;
      } else if (selectedOptionId == correctOption?.id) {
        correct++;
        score += question!.marks;
      } else {
        incorrect++;
      }
    });

    percentage = Math.round((score / totalMark) * 100);
    this.quizResult.score = score;
    this.quizResult.correct = correct;
    this.quizResult.incorrect = incorrect;
    this.quizResult.unattempt = unattempt;
    this.quizResult.percentage = percentage;
  }
}
