import game from "../src/Sibala";

describe('Sibala', function () {
  it('result_SameCategory_ReturnTie', function () {
    const input = 'Amy:6 6 6 6  Lin:6 6 6 6';
    expect(game.result(input)).toBe('Tie.');
  });
  it('parseInput_ReturnPlayerNameAndDices', function () {
    let input = 'Amy:6 6 6 6  Lin:1 1 1 1';
    const players = game.parseInput(input)
    expect(players[0].name).toBe('Amy')
    expect(players[1].name).toBe('Lin')
    expect(players[0].dices[4][0]).toBe('6')
    expect(players[1].dices[4][0]).toBe('1')
  });
});