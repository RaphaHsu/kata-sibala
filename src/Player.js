import _ from "lodash";
import { Dice } from "./Dice";

export class Player {
  constructor(text) {
    const [ name, dicesString ] = text.split(':')
    const dicesArray = dicesString.split(' ').map(val => parseInt(val));
    const dicesStat = _.invertBy(_.countBy(dicesArray))
    const { dices, category, winningPoint } = new Dice(dicesStat)

    this.name = name;
    this.dices = dices;
    this.category = category;
    this.winningPoint = winningPoint;
  }
}