import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogModule,
} from '@angular/material/dialog';
import { AfterViewInit, Component, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';
import { QUESTIONS } from '../../../environments/questions';
import { ExplanationDialogComponent } from '../explanation-dialog/explanation-dialog.component';
import { ExplanationComponent } from '../explanation/explanation.component';


@Component({
  selector: 'app-game-main-page',
  standalone: true,
  imports: [ExplanationDialogComponent],
  templateUrl: './game-main-page.component.html',
  styleUrl: './game-main-page.component.scss',
})
export class GameMainPageComponent {
  currentQuestion: number = 1;
  rightQuestions: number = 0;
  questions = QUESTIONS;
  question: string = '';
  answers: any = [];
  rightAnswer: number = 0;
  questionAnswered: boolean = false;
  answeringAllowed: boolean = true;
  alreadyAskedQuestions: any = [];
  game_over: boolean = false;
  @Input() randomIndex: number = 0;

  @ViewChild(ExplanationDialogComponent) explanationDialog: ExplanationDialogComponent | undefined;
  @Output() dialogReady: EventEmitter<void> = new EventEmitter<void>();

  private readonly QUESTIONS_PER_ROUND: number = 10;

  constructor(public dialog: MatDialog) {}


  ngOnInit() {
    this.showPlayScreen();
  }


  showPlayScreen() {
      this.game_over = false;
      this.rightQuestions = 0;
      this.getQuestion();
  }

/**
 * This function is used to check if all questions available have been asked
 */
  async resetAlreadyAskedQuestions() {
    if (this.alreadyAskedQuestions.length === this.questions.length) {
        // resets the alreadyAskedQuestions array
        this.alreadyAskedQuestions = [];
    }
}

async getQuestion() {
    // the below called function will check if all questions available have been asked
    await this.resetAlreadyAskedQuestions();
    // looks for a new random index until one is created that is not yet in the alreadyAskedQuestions array
    do {
        this.randomIndex = Math.floor(Math.random() * this.questions.length);
    } while (this.alreadyAskedQuestions.includes(this.randomIndex));
    // updates the question and answers
    this.question = this.questions[this.randomIndex].question;
    this.answers = this.questions[this.randomIndex].answers;
    this.rightAnswer = this.questions[this.randomIndex].right_answer;
    // adds the index to alreadyAskedQuestions array
    this.alreadyAskedQuestions.push(this.randomIndex);
}

async getNextQuestion() {
    if (this.isGameComplete()) {
      this.showEndScreen();
      return;
    }
    await this.resetAlreadyAskedQuestions();
    
    this.randomIndex = this.selectRandomQuestionIndex();
    this.resetAnswerColors(); 
    this.updateCurrentQuestion(this.randomIndex);
    this.disableNextButton();
    this.disableExplanationButton();
    this.answeringAllowed = true;
}
  

resetAnswerColors() {
    const answerElements = document.querySelectorAll('.quizanswer');
    answerElements.forEach(element => {
      element.classList.remove('bg-success', 'bg-danger');
    });
  }


private disableExplanationButton(){
    const explanationButton = document.getElementById(
      'explanation-button'
    ) as HTMLButtonElement;
    if (explanationButton) {
      explanationButton.disabled = true;
    }
  }


disableNextButton() {
    const nextButton = document.getElementById('next-button') as HTMLButtonElement;
    if (nextButton) {
      nextButton.disabled = true;
    }
  }
  

private isGameComplete(): boolean {
    return this.currentQuestion > this.questions.length ||
           this.currentQuestion % this.QUESTIONS_PER_ROUND === 0;
  }


private selectRandomQuestionIndex(): number {
    let newRandomIndex;
    do {
      newRandomIndex = Math.floor(Math.random() * this.questions.length);
    } while (this.alreadyAskedQuestions.includes(newRandomIndex));
    return newRandomIndex;
  }

  componentReady() {
    this.dialogReady.emit();
  }


  answer(selection: number) {
    if (!this.answeringAllowed) return;
    this.answeringAllowed = false;
    const selectedElement = document.getElementById(`answer${selection}`);
    if (!selectedElement) return;
    if (selection === this.rightAnswer) {
      this.handleCorrectAnswer(selectedElement);
    } else {
      this.handleIncorrectAnswer(selectedElement);
    }
    this.enableNextButton();
    this.questionAnswered = true;
    if (this.explanationDialog) {
      this.explanationDialog.enableExplanationButton();
    }
  }  
  

handleCorrectAnswer(selectedElement: HTMLElement) {
    selectedElement.classList.add('bg-success');
    this.rightQuestions += 1;
    if (this.explanationDialog) {
      this.explanationDialog.enableExplanationButton();
    }
  }
  

  handleIncorrectAnswer(selectedElement: HTMLElement) {
    const rightElement = document.getElementById(`answer${this.rightAnswer}`);
    selectedElement.classList.add('bg-danger');
    if (rightElement) {
      rightElement.classList.add('bg-success');
    }
    setTimeout(() => {
      if (this.explanationDialog) {
        this.explanationDialog.openDialog();
      }
    }, 600);
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
    this.answers = this.questions[index].answers;
    this.rightAnswer = this.questions[index].right_answer;
  }


showEndScreen() {
    this.game_over = true;
    this.currentQuestion = 1;
    this.answeringAllowed = true;
  }


showGoodbyScreen() {
    this.currentQuestion = 1;
  }
}