import { TrainingModel } from './training.model';
import { Subject } from 'rxjs';
import { TrainingComponent } from './training.component';

export class TrainingService {
  private availableTrainings: TrainingModel[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, caloriesBurn: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, caloriesBurn: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, caloriesBurn: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, caloriesBurn: 8 },
  ];
  private ongoingTraining: TrainingModel | null;
  ongoingTrainingChanged = new Subject<TrainingModel | null>();
  constructor() {
    this.ongoingTraining = null;
  }

  getAvailableExercises() {
    return this.availableTrainings.slice();
  }

  startTraining(id: string) {
    this.ongoingTraining = this.availableTrainings.find(
      training => training.id === id
    )!;
    this.ongoingTrainingChanged.next({ ...this.ongoingTraining });
  }
}
