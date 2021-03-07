import game from "../src/Sibala";

describe('Sibala', function () {
  describe('Same category', function () {
    describe('All the same kind ', function () {
      it('result_SameDices_ReturnTie', function () {
        const input = 'Amy:6 6 6 6  Lin:6 6 6 6';
        expect(game.result(input)).toBe('Tie.');
      });
      it('result_DifferentDices_ReturnWin', function () {
        const input = 'Amy:6 6 6 6  Lin:1 1 1 1';
        expect(game.result(input)).toBe('Amy wins, all the same kind: 6');
      });
    });
    describe('No point', function () {
      it('result_ReturnTie', function () {
        const input = 'Amy:1 2 3 4  Lin:3 4 5 6'
        expect(game.result(input)).toBe('Tie.');
      });
    });
    describe('Normal Point', function () {
      it('result_SameWinningPoint_ReturnTie', function () {
        const input = 'Amy:1 1 3 4  Lin:1 1 4 3'
        expect(game.result(input)).toBe('Tie.');
      });
      it('result_SameWinningPoint_ReturnWin', function () {
        const input = 'Amy:1 1 3 3  Lin:1 1 4 3'
        expect(game.result(input)).toBe('Lin wins, normal point: 7');
      });
    });
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