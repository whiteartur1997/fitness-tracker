import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingModel } from '../training.model';
import { TrainingService } from '../training.service';

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

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {
    this.ongoingTraining = null;
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step =
      (this.trainingService.getOngoingTraining()!.duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeTraining();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      width: '250px',
      data: { progress: this.progress },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelTraining(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
