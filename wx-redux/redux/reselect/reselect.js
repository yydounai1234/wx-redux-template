import { createSelector } from '../../src/reselect/reselect'

const getVisibilityFilter = state => state.visibilityFilter

export const getVisibleTodos = createSelector(
  [getVisibilityFilter],
  (visibilityFilter) => {
    return visibilityFilter
  }
)