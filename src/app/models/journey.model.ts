import { JourneyStop } from './journey-stop.model';

export class Journey {
  constructor(
    public id: string = '',
    public code: string = '',
    public description: string = '',
    public journeyStops: JourneyStop[] = []
  ) {}
}
