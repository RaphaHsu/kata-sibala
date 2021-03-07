import _ from 'lodash';
import { CategoryOutput, CategoryType, getCategory } from "./Category";

class Sibala {
  winner = null;

  constructor(input) {
    const [ firstPlayer, secondPlayer ] = Sibala.parseInput(input)
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
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

    function getPlayer(text) {
      const [ name, dicesString ] = text.split(':')
      const dicesArray = dicesString.split(' ').map(val => parseInt(val));
      const dices = _.invertBy(_.countBy(dicesArray))
      return { name, dices }
    }

    function getWinningPoint(player) {
      const { category, dices } = player;

      switch (category) {
        case CategoryType.ALL_THE_SAME_KIND:
          return _.first(dices[4])
        case CategoryType.NORMAL_POINT:
          const point = dices[2]?.length === 2
            ? _.max(dices[2]) * 2
            : _.sum(_.map(dices[1], val => parseInt(val)))
          return point
      }
    }

    const firstPlayer = getPlayer(firstPlayerInput)
    const secondPlayer = getPlayer(secondPlayerInput)

    firstPlayer.category = getCategory(firstPlayer.dices);
    secondPlayer.category = getCategory(secondPlayer.dices);
    firstPlayer.winningPoint = getWinningPoint(firstPlayer);
    secondPlayer.winningPoint = getWinningPoint(secondPlayer);

    return [
      firstPlayer, secondPlayer
    ]
  }
}

export default Sibala;
