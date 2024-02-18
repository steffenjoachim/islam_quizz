import { Component } from '@angular/core';
import { QUESTIONS } from '../../../environments/questions';

@Component({
  selector: 'app-game-main-page',
  standalone: true,
  imports: [],
  templateUrl: './game-main-page.component.html',
  styleUrl: './game-main-page.component.scss',
})
export class GameMainPageComponent {
  currentQuestion: number = 1;
  rightQuestions: number = 0;
  questions = QUESTIONS;
  question: string = '';
  answer1: string = 'ABC';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';
  rightAnswer: string = '';
  alreadyAskedQuestions: any = [];
  game_over: boolean = false;

  private readonly QUESTIONS_PER_ROUND: number = 10;

  ngOnInit() {
    this.showPlayScreen();
  }

  showPlayScreen() {
      this.game_over = false;
      this.rightQuestions = 0;
      this.getQuestion();
  }

  async getQuestion() {
    // checkes if all questions have been ask
    if (this.alreadyAskedQuestions.length === this.questions.length) {
        // resets the alreadyAskedQuestions array
        this.alreadyAskedQuestions = [];
    }
    // looks for a new random index until one is created that is not yet in the alreadyAskedQuestions array
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * this.questions.length);
    } while (this.alreadyAskedQuestions.includes(randomIndex));
    // updates the question and answers
    this.question = this.questions[randomIndex].question;
    this.answer1 = this.questions[randomIndex].answer1;
    this.answer2 = this.questions[randomIndex].answer2;
    this.answer3 = this.questions[randomIndex].answer3;
    this.answer4 = this.questions[randomIndex].answer4;
    this.rightAnswer = this.questions[randomIndex].right_answer;

    // adds the index to alreadyAskedQuestions array
    this.alreadyAskedQuestions.push(randomIndex);
}

  async getNextQuestion() {
    if (this.isGameComplete()) {
      this.showEndScreen();
      return;
    }
    const randomIndex = this.selectRandomQuestionIndex();
    this.resetAnswerColors(); 
    this.updateCurrentQuestion(randomIndex);
    this.disableNextButton();
  }
  
  resetAnswerColors() {
    const answerElements = document.querySelectorAll('.quizanswer');
    answerElements.forEach(element => {
      element.classList.remove('bg-success', 'bg-danger');
    });
  }

  disableNextButton() {
    const nextButton = document.getElementById('next-button') as HTMLButtonElement;
    if (nextButton) {
      nextButton.disabled = true;
    }
  }
  
  private isGameComplete(): boolean {
    console.log(this.currentQuestion)
    return this.currentQuestion > this.questions.length ||
           this.currentQuestion % this.QUESTIONS_PER_ROUND === 0;
  }

  private selectRandomQuestionIndex(): number {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.questions.length);
    } while (this.alreadyAskedQuestions.includes(randomIndex));
    return randomIndex;
  }

  answer(selection: string) {
    const selectedElement = document.getElementById(selection);
    if (selectedElement) {
      if (selection === this.rightAnswer) {
        selectedElement.classList.add('bg-success');
        this.rightQuestions += 1;
      } else {
        const rightElement = document.getElementById(this.rightAnswer);
        selectedElement.classList.add('bg-danger');
        rightElement?.classList.add('bg-success')
      }
    } 
    this.enableNextButton()
  }

  private enableNextButton(){
    const nextButton = document.getElementById(
      'next-button'
    ) as HTMLButtonElement;
    if (nextButton) {
      nextButton.disabled = false;
    }
  }

  private updateCurrentQuestion(index: number): void {
    this.currentQuestion += 1;
    this.alreadyAskedQuestions.push(index);
    this.question = this.questions[index].question;
    this.answer1 = this.questions[index].answer1;
    this.answer2 = this.questions[index].answer2;
    this.answer3 = this.questions[index].answer3;
    this.answer4 = this.questions[index].answer4;
    this.rightAnswer = this.questions[index].right_answer;
  }

  showEndScreen() {
    this.game_over = true;
    this.currentQuestion = 1;
  }
}