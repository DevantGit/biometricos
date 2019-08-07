import { CheckInOut } from "./CheckInOut";

export class Cliente {
  userID: number;
  badgerNumber: number;
  name: string;
  title: string;
  checkDTO: Array<CheckInOut>;
  fechaIngreso: string;
  fechaSalida: string;
  statusIngreso: string;
  horaIn: string;
  horaOut: string;
  fechaFormt: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
}

}
