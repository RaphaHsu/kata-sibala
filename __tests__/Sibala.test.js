import game from "../src/Sibala";
import Sibala from "../封存/src/sibala";

describe('Sibala', function () {
  it('result_SameCategory_ReturnTie', function () {
    const input = 'Amy:6 6 6 6  Lin:6 6 6 6';
    expect(game.result(input)).toBe('Tie.');
  });
});