import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TrainingModel } from '../training.model';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns: Array<keyof TrainingModel> = [
    'date',
    'name',
    'duration',
    'caloriesBurn',
    'state',
  ];
  dataSource = new MatTableDataSource<TrainingModel>();

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private trainingService: TrainingService) {
    this.sort = undefined;
    this.paginator = undefined;
  }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getDoneTrainings();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort!;
  }

  doFilter(event: KeyboardEvent) {
    this.dataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }
}
