import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';
import { Stop } from 'src/app/models/stop.model';
import { StopService } from 'src/app/services/stop/stop.service';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css'],
})
export class StopComponent implements OnInit {
  stops: Stop[] = [];
  title = '';
  currentIndex = -1;
  roles: string[] = [];

  public formGroup: FormGroup = this.formBuilder.group({
    id: null,
    code: '',
    description: '',
    x: '',
    y: '',
  });

  constructor(
    private stopService: StopService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  createFormGroup(): Stop {
    return new Stop();
  }

  ngOnInit(): void {
    this.getAllStops();
    // this.roles = Object.keys(Role).filter((key) => isNaN(Number(key)));
  }

  add() {
    const newStop: Stop = {
      id: (this.stops.length + 1).toString(),
      code: '',
      description: '',
      x: '',
      y: '',
    };
    this.stops = [...this.stops, newStop];

    this.stopService.add(newStop).subscribe(() => this.getAllStops());
  }

  getAllStops(): void {
    this.stopService.getAll().subscribe((stops) => (this.stops = stops));
  }

  update({ formGroup, dataItem }: { formGroup: FormGroup; dataItem: Stop }) {
    if (!dataItem.id) {
      dataItem.id = this.stops.length
        ? (Math.max(...this.stops.map((u) => Number(u.id))) + 1).toString()
        : '1';
      this.stopService.add(dataItem).subscribe((savedStop) => {
        this.stops = this.stops.map((u) => (u === dataItem ? savedStop : u));
      });
    } else {
      this.stopService.update(dataItem.id, dataItem).subscribe();
    }
  }

  remove({ dataItem }: { dataItem: Stop }) {
    this.stopService.delete(dataItem.id).subscribe(() => {
      this.getAllStops();
    });
  }
}
