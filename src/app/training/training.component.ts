import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';
import { TrainingModel } from './training.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining: TrainingModel | null;
  ongoingTrainingSub: Subscription;
  constructor(private trainingService: TrainingService) {
    this.ongoingTrainingSub = Subscription.EMPTY;
    this.ongoingTraining = null;
  }

  ngOnInit() {
    this.ongoingTrainingSub =
      this.trainingService.ongoingTrainingChanged.subscribe(training => {
        this.ongoingTraining = training;
      });
  }

  ngOnDestroy() {
    this.ongoingTrainingSub.unsubscribe();
  }
}
