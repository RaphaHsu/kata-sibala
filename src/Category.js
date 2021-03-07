export const CategoryType = {
  ALL_THE_SAME_KIND: 0,
  NORMAL_POINT: 1,
  NO_POINT: 2,
}
export const CategoryOutput = {
  0: 'all the same kind',
  1: 'normal point',
}

/**
 * getCategory([1,1,1,1])
 *
 * 0 (ALL_THE_SAME_KIND)
 */

export function getCategory(dices) {
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