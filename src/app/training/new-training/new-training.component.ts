import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { TrainingModel } from '../training.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  availableTrainings: TrainingModel[];
  selectedTrainingId: string | null;

  constructor(public trainingService: TrainingService) {
    this.availableTrainings = [];
    this.selectedTrainingId = null;
  }

  ngOnInit() {
    this.availableTrainings = this.trainingService.getAvailableExercises();
    this.selectedTrainingId = this.availableTrainings[0].id;
  }

  onStart() {
    this.trainingService.startTraining(this.selectedTrainingId!);
  }
}
