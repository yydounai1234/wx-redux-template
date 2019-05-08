import { createSelector } from '../../src/reselect/reselect'

const getVisibilityFilter = (state,props) => state.visibilityFilter
const getNumber = (state,props) => {
  return props&&props.num
}

//每个组件生成新的记忆
export const makeGetVisibleTodos=()=>{
  return createSelector(
    [getVisibilityFilter,getNumber],
    (visibilityFilter,number) => {
      return visibilityFilter+number*1000
    }
  )
}
