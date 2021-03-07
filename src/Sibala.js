import { CategoryOutput } from "./Category";
import { Player } from "./Player";

class Sibala {
  winner = null;

  constructor(input) {
    const [ firstPlayer, secondPlayer ] = Sibala.parseInput(input)
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
  }

  result() {
    if (this.isSameCategory() && this.isSameWinningPoint()) {
      return this.outputTie();
    }

    if (this.isSameCategory()) {
      this.compareWinningPoint();
    } else {
      this.compareCategoryPriority();
    }

    return this.outputWin()
  }

  outputWin() {
    if (!this.winner) throw new Error('No Winner')

    return `${this.winner.name} wins, ${CategoryOutput[this.winner.category]}: ${this.winner.winningPoint}`;
  }

  outputTie() {
    return 'Tie.'
  }

  isSameCategory() {
    return this.firstPlayer.category === this.secondPlayer.category;
  }

  isSameWinningPoint() {
    return this.firstPlayer.winningPoint === this.secondPlayer.winningPoint;
  }


  compareCategoryPriority() {
    this.winner = (this.firstPlayer.category < this.secondPlayer.category) ? this.firstPlayer : this.secondPlayer
  }

  compareWinningPoint() {
    this.winner = (this.firstPlayer.winningPoint > this.secondPlayer.winningPoint) ? this.firstPlayer : this.secondPlayer;
  }

  /**
   * parseInput('Amy:6 6 6 6  Lin:1 1 1 1')
   *
   * [
   *   {name: 'Amy', dices: [6, 6, 6, 6]},
   *   {name: 'Lin', dices: [1, 1, 1, 1]}
   * ]
   */

  static parseInput(input) {
    const [ firstPlayerInput, secondPlayerInput ] = input.split('  ');
    const firstPlayer = new Player(firstPlayerInput)
    const secondPlayer = new Player(secondPlayerInput)

    return [
      firstPlayer, secondPlayer
    ]
  }
}


export default Sibala;
