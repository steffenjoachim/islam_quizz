import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QUESTIONS } from '../../../environments/questions';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.scss']
})
export class ExplanationComponent implements OnInit {
  @Input() randomIndex!: number;

  questions = QUESTIONS;
  explanation: any = ''; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: { randomIndex: number }) {}

  ngOnInit() {
    this.randomIndex = this.data.randomIndex;
    this.renderExplanation();
  }

  renderExplanation(){
    this.explanation = document.getElementById('container');
    this.explanation.innerHTML = `${this.questions[this.randomIndex].explanation}`;
  }
}

