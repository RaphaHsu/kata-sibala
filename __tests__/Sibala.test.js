import Sibala from "../src/Sibala";

describe('Sibala', function () {
  let output;

  function given(input) {
    output = Sibala.result(input);
  }

  function outputShouldBe(msg) {
    expect(output).toBe(msg);
  }

  describe('Same category', function () {
    describe('All the same kind ', function () {
      it('result_SameDices_ReturnTie', function () {
        given('Amy:6 6 6 6  Lin:6 6 6 6')
        outputShouldBe('Tie.');
      });
      it('result_DifferentDices_ReturnWin', function () {
        given('Amy:6 6 6 6  Lin:1 1 1 1')
        outputShouldBe('Amy wins, all the same kind: 6');
      });
    });
    describe('No point', function () {
      it('result_ReturnTie', function () {
        given('Amy:1 2 3 4  Lin:3 4 5 6')
        outputShouldBe('Tie.');
      });
    });
    describe('Normal Point', function () {
      it('result_SameWinningPoint_ReturnTie', function () {
        given('Amy:1 1 3 4  Lin:1 1 4 3')
        outputShouldBe('Tie.');
      });
      it('result_SameWinningPoint_ReturnWin', function () {
        given('Amy:1 1 3 3  Lin:1 1 4 3')
        outputShouldBe('Lin wins, normal point: 7');
      });
      it('result_TwoPair_ReturnWin', function () {
        given('Amy:1 1 3 3  Lin:1 1 4 4')
        outputShouldBe('Lin wins, normal point: 8');
      });
    });
  });
  describe('Different category', function () {
    it('All the same kind > No point', function () {
      given('Amy:1 1 1 1  Lin:1 2 3 4')
      outputShouldBe('Amy wins, all the same kind: 1');
    });
    it('All the same kind > Normal point', function () {
      given('Amy:1 1 1 1  Lin:1 1 2 2')
      outputShouldBe('Amy wins, all the same kind: 1');
    });
    it('Normal point > No point', function () {
      given('Amy:1 1 2 2  Lin:1 2 3 4')
      outputShouldBe('Amy wins, normal point: 4');
    });
    it('No point < Normal point', function () {
      given('Amy:1 2 3 4  Lin:1 1 2 2')
      outputShouldBe('Lin wins, normal point: 4');
    });
    it('No Point < All 6', function () {
      given('Amy:3 3 3 2  Lin:6 6 6 6')
      outputShouldBe('Lin wins, all the same kind: 6');
    });
  });
  it('parseInput_ReturnPlayerNameAndDices', function () {
    let input = 'Amy:6 6 6 6  Lin:1 1 1 1';
    const players = Sibala.parseInput(input)
    expect(players[0].name).toBe('Amy')
    expect(players[1].name).toBe('Lin')
    expect(players[0].dices[4][0]).toBe('6')
    expect(players[1].dices[4][0]).toBe('1')
  });
});