import _ from 'lodash';

const CategoryType = {
  ALL_THE_SAME_KIND: "ALL_THE_SAME_KIND",
}


function result(input) {
  const [ firstPlayer, secondPlayer ] = parseInput(input)

  firstPlayer.category = getCategory(firstPlayer.dices);
  secondPlayer.category = getCategory(secondPlayer.dices);

  if (firstPlayer.category === secondPlayer.category) {
    if (firstPlayer.category === CategoryType.ALL_THE_SAME_KIND) {
      if (firstPlayer.dices[4][0] !== secondPlayer.dices[4][0]) {
        const winner = (firstPlayer.dices[4][0] > secondPlayer.dices[4][0]) ? firstPlayer : secondPlayer;
        return `${winner.name} wins, all the same kind: ${winner.dices[4][0]}`
      }
    }
  }

  return 'Tie.'
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

  const firstPlayer = getPlayer(firstPlayerInput)
  const secondPlayer = getPlayer(secondPlayerInput)

  return [
    firstPlayer, secondPlayer
  ]
}

export default {
  result,
  parseInput
};