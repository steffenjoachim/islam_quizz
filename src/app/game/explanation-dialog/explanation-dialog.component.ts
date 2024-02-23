import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
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

export class ExplanationDialogComponent implements OnInit {
  @Input() randomIndex: number = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    console.log('randomIndex in ExplanationDialogComponent:', this.randomIndex);
  }

  openDialog() {
    console.log('randomIndex in ExplanationDialogComponent:', this.randomIndex);
    const dialogRef = this.dialog.open(ExplanationComponent, {
      data: {
        randomIndex: this.randomIndex
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Hier können Sie weitere Aktionen ausführen, wenn der Dialog geschlossen wird
    });
  }
}
