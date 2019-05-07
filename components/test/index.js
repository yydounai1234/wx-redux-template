import {ComponentConnect} from '../../wx-redux/connect/index.js'
import {getVisibleTodos} from '../../wx-redux/redux/reselect/reselect'
Component(ComponentConnect({
    data:{
        a:123
    },
    mapStateToProps(state){
        return {
          todos: state.todos,
          visibilityFilter:getVisibleTodos(state)
        }
    },
    methods:{
        change(value){
            console.log(value)
            return value
        }
    }
}))