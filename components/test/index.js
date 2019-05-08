import {ComponentConnect} from '../../wx-redux/connect/index.js'
import {makeGetVisibleTodos} from '../../wx-redux/redux/reselect/reselect'
Component(ComponentConnect({
    data:{
        a:123
    },
    properties:{
        num:{
            type:Number,
            value:10,
            observer(){
                this.$apply&&this.$apply()
            }
        }
    },
    mapStateToProps(){
        this.getVisibleTodos = makeGetVisibleTodos()
        return (state,props)=>{
            return{
                todos: state.todos,
                visibilityFilter:this.getVisibleTodos(state,props)
            }
        }
    },
    methods:{
        change(value){
            return value
        }
    }
}))