import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { JourneyStop } from 'src/app/models/journey-stop.model';
import { Journey } from 'src/app/models/journey.model';
import { Stop } from 'src/app/models/stop.model';
import { JourneyService } from 'src/app/services/journey/journey.service';
import { StopService } from 'src/app/services/stop/stop.service';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css'],
})
export class JourneyComponent {
  journeys: Journey[] = [];
  stops: Stop[] = [];
  title = '';
  currentIndex = -1;
  roles: string[] = [];
  orderMap: { [key: string]: number } = {};

  public formGroup: FormGroup = this.formBuilder.group({
    id: null,
    code: '',
    description: '',
    x: '',
    y: '',
  });

  constructor(
    private journeyService: JourneyService,
    private stopService: StopService,
    private formBuilder: FormBuilder
  ) {
    this.createJourneyFormGroup = this.createJourneyFormGroup.bind(this);
  }

  createJourneyFormGroup(): Journey {
    return new Journey();
  }

  ngOnInit(): void {
    this.getAllJourneys();
    this.getAllStops();
    console.log(this.stops);
    //this.roles = Object.keys(Role).filter((key) => isNaN(Number(key)));
  }

  onSubmit(journeyForm: NgForm) {
    if (journeyForm.valid) {
      const updatedJourney = journeyForm.value; // Get form values

      // Send JourneyStop values (stopId and order) as part of Journey
      updatedJourney.journeyStops = updatedJourney.journeyStops.map(
        (stop: JourneyStop) => {
          return {
            stopId: stop.stopId,
            order: stop.order,
          };
        }
      );

      this.journeyService
        .update(updatedJourney.id, updatedJourney)
        .subscribe(() => {
          this.getAllJourneys();
        });
    }
  }

  update({ formGroup, dataItem }: { formGroup: FormGroup; dataItem: Journey }) {
    var journeyData = JSON.parse(JSON.stringify(dataItem));

    const updatedJourney = {
      id: journeyData.id,
      code: journeyData.code,
      description: journeyData.description,
      journeyStops: journeyData.journeyStops.map((stop: JourneyStop) => ({
        stopId: journeyData.stopId.id,
        order: journeyData.order,
      })),
    };

    this.journeyService
      .update(updatedJourney.id, updatedJourney)
      .subscribe(() => {
        this.getAllJourneys();
      });
  }

  getAllStops(): void {
    this.stopService.getAll().subscribe(
      (stops) => {
        this.stops = stops;
      },
      (error) => {
        console.error('Error fetching stops:', error);
      }
    );
  }

  getStopCode(item: any): string {
    let code: string =
      this.stops.find((stop) => stop.id === item.journeyStops[0]?.stopId)
        ?.code ?? '';

    return code;
  }

  getAllJourneys(): void {
    this.journeyService
      .getAll()
      .subscribe((journeys) => (this.journeys = journeys));
  }

  remove({ dataItem }: { dataItem: Journey }) {
    this.journeyService.delete(dataItem.id).subscribe(() => {
      this.getAllJourneys();
    });
  }
}
