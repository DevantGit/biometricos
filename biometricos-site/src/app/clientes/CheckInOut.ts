export class CheckInOut {
  userID: number;
  date: string;
  dateFormat: string;
  fechaIn: string;
  fechaOut: string;
  max: number;
  min: number;
  statusIngreso: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}