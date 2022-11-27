export interface TrainingModel {
  id: string;
  name: string;
  duration: number;
  caloriesBurn: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}
