import { TrainingModel } from './training.model';
import { Subject } from 'rxjs';

export class TrainingService {
  private availableTrainings: TrainingModel[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, caloriesBurn: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, caloriesBurn: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, caloriesBurn: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, caloriesBurn: 8 },
  ];
  private doneTrainings: TrainingModel[] = [];
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

  completeTraining() {
    this.doneTrainings.push({
      ...this.ongoingTraining!,
      date: new Date(),
      state: 'completed',
    });
    this.ongoingTraining = null;
    this.ongoingTrainingChanged.next(null);
    console.log(this.doneTrainings);
  }

  cancelTraining(progress: number) {
    this.doneTrainings.push({
      ...this.ongoingTraining!,
      date: new Date(),
      duration: (this.ongoingTraining!.duration * progress) / 100,
      caloriesBurn: (this.ongoingTraining!.caloriesBurn * progress) / 100,
      state: 'cancelled',
    });
    this.ongoingTraining = null;
    this.ongoingTrainingChanged.next(null);
    console.log(this.doneTrainings);
  }

  getOngoingTraining() {
    return this.ongoingTraining;
  }

  getDoneTrainings() {
    return this.doneTrainings.slice();
  }
}
