import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ExplanationComponent } from '../explanation/explanation.component';

@Component({
  selector: 'app-explanation-dialog',
  standalone: true,
  imports: [CommonModule, 
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './explanation-dialog.component.html',
  styleUrl: './explanation-dialog.component.scss'
})

export class ExplanationDialogComponent {
  @Input() randomIndex: number = 0;
  @Input() questionAnswered: boolean = false;

  dialogRef: MatDialogRef<ExplanationDialogComponent> | undefined;


  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ExplanationComponent, {
      data: {
        randomIndex: this.randomIndex
      }
    });
  }

  
  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  

  enableExplanationButton(){
    const explanationButton = document.getElementById(
      'explanation-button'
    ) as HTMLButtonElement;
    if (explanationButton) {
      explanationButton.disabled = false;
    }
  }  

  openExplanation(){
    this.openDialog();
  }

}
