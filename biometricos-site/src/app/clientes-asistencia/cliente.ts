import { Assistence } from "./Assistence";

export class Cliente {
  userID: number;
  badgerNumber: number;
  name:string;
  title:string;
  checkInOut: {
    userID: number,
    badgerNumber: number,
    name: string,
    title: string
  };
  checkDTO: Array<Assistence>;
  fechaIngreso: string;
  fechaSalida: string;
  statusIngreso: string;
  horaIn: string;
  horaOut: string;
  fechaFormt: string;
}
