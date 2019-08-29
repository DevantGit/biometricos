import { CheckInOut } from "./CheckInOut";

export class Assistence {
  userID: number;
  badgerNumber: number;
  name: string;
  title: string;
  CheckInOut: {userID: number, date: string, dateFormat: string}
  checkDTO: CheckInOut[]; 
  fechaIngreso: string;
  fechaSalida: string;
  statusIngreso: string;
  horaIn: string;
  horaOut: string;
  fechaFormt: string;
  }