import _ from 'lodash';
import { CategoryOutput, CategoryType } from "./Category";

function result(input) {
  const [ firstPlayer, secondPlayer ] = parseInput(input)

  function outputWin(winner) {
    return `${winner.name} wins, ${CategoryOutput[winner.category]}: ${winner.winningPoint}`;
  }

  function outputTie() {
    return 'Tie.'
  }

  function isSameCategory() {
    return firstPlayer.category === secondPlayer.category;
  }

  function isSameWinningPoint() {
    return firstPlayer.winningPoint === secondPlayer.winningPoint;
  }

  if (isSameCategory() && isSameWinningPoint()) {
    return outputTie();
  }

  if (isSameCategory()) {
    const winner = (firstPlayer.winningPoint > secondPlayer.winningPoint) ? firstPlayer : secondPlayer;
    return outputWin(winner)
  }

  if (firstPlayer.category === CategoryType.ALL_THE_SAME_KIND && secondPlayer.category === CategoryType.NO_POINT) {
    const winner = firstPlayer
    return outputWin(winner)
  }
  if (firstPlayer.category === CategoryType.ALL_THE_SAME_KIND && secondPlayer.category === CategoryType.NORMAL_POINT) {
    const winner = firstPlayer
    return outputWin(winner)
  }
  if (firstPlayer.category === CategoryType.NORMAL_POINT && secondPlayer.category === CategoryType.NO_POINT) {
    const winner = firstPlayer
    return outputWin(winner)
  }
  const winner = (firstPlayer.category < secondPlayer.category) ? firstPlayer : secondPlayer
  return outputWin(winner)

  throw new Error('this sibala match not implement')
}

/**
 * getCategory([1,1,1,1])
 *
 * 0 (ALL_THE_SAME_KIND)
 */
function getCategory(dices) {
  if (dices[4]) {
    return CategoryType.ALL_THE_SAME_KIND
  }

  if (dices[1]?.length === 4) {
    return CategoryType.NO_POINT
  }

  if (dices[2]) {
    return CategoryType.NORMAL_POINT
  }

  throw new Error('this category type not implement')
}

/**
 * parseInput('Amy:6 6 6 6  Lin:1 1 1 1')
 *
 * [
 *   {name: 'Amy', dices: [6, 6, 6, 6]},
 *   {name: 'Lin', dices: [1, 1, 1, 1]}
 * ]
 */
function parseInput(input) {
  const [ firstPlayerInput, secondPlayerInput ] = input.split('  ');

  function getPlayer(text) {
    const [ name, dicesString ] = text.split(':')
    const dicesArray = dicesString.split(' ').map(val => parseInt(val));
    const dices = _.invertBy(_.countBy(dicesArray))
    return { name, dices }
  }

  function getWinningPoint(player) {
    const { dices } = player;

    switch (player.category) {
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

export default {
  result,
  parseInput
};