import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingModel } from '../training.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: ReturnType<typeof setInterval> | undefined;
  @Input() ongoingTraining: TrainingModel | null;
  @Output() trainingFinished = new EventEmitter();

  constructor(private dialog: MatDialog) {
    this.ongoingTraining = null;
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      width: '250px',
      data: { progress: this.progress },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingFinished.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
