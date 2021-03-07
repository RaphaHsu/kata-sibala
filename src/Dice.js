import { CategoryType } from "./Category";
import _ from "lodash";

export class Dice {
  constructor(dices) {
    this.dices = dices;
    this.category = this.getCategory()
    this.winningPoint = this.getWinningPoint()
  }

  /**
   * getCategory([1,1,1,1])
   *
   * 0 (ALL_THE_SAME_KIND)
   */

  getCategory() {
    if ((this.dices)[4]) {
      return CategoryType.ALL_THE_SAME_KIND
    }

    if ((this.dices)[1]?.length === 4) {
      return CategoryType.NO_POINT
    }

    if ((this.dices)[2]) {
      return CategoryType.NORMAL_POINT
    }

    throw new Error('this category type not implement')
  }

  getWinningPoint() {
    switch (this.category) {
      case CategoryType.ALL_THE_SAME_KIND:
        return _.first((this.dices)[4])
      case CategoryType.NORMAL_POINT:
        const point = (this.dices)[2]?.length === 2
          ? _.max((this.dices)[2]) * 2
          : _.sum(_.map((this.dices)[1], val => parseInt(val)))
        return point
    }
  }
}