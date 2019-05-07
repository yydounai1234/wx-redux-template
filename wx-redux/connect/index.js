import { createStore,applyMiddleware } from '../src/index'
import thunkMiddleware from '../src/middleware/redux-thunk'
import todoApp from '../redux/reducers/reducer'

let store = createStore(todoApp,applyMiddleware(
    thunkMiddleware
  ))

function onStateChange() {
    let that=this;
    let states=store.getState();
    //需要改变的数据
    let change={};
    var data = that.mapStateToProps(states);

    //未改变数据无需setData
    Object.keys(data).forEach((k) => {
        if(data[k]!==that.data[k]){
            change[k]=data[k]
        }
    });
    that.setData(change)
}
function PageConnect(page) {
    //绑定
    const onLoad = page.onLoad;
    const onUnload = page.onUnload;

    if (page.mapStateToProps) {
        let unSubscribe = null;

        //redux数据植入data
        var data = page.mapStateToProps(store.getState());
        page.data = { ...page.data || {}, ...data }

        //监听state变化
        page.onLoad = function () {
            unSubscribe = store.subscribe(onStateChange.bind(this));
            onStateChange.call(this)
            onLoad && onLoad.apply(this, arguments);
        }

        //页面卸载后移除监听
        page.onUnload = function () {
            unSubscribe && unSubscribe();
            unSubscribe = null;
            onUnload && onUnload.apply(this, arguments);
        }
    }
    page.mapDispatchToProps && Object.assign(page, page.mapDispatchToProps(store.dispatch))

    return page
}

function ComponentConnect(component) {
    //绑定
    const attached = component.attached;
    const detached = component.detached;

    if (component.mapStateToProps) {

        let unSubscribe = null;
        component={...component,...component.methods||{}}

        //redux数据植入data
        var data = component.mapStateToProps.call(component,store.getState());
        component.data = { ...component.data || {}, ...data }

        //监听state变化
        component.attached = function () {
            unSubscribe = store.subscribe(onStateChange.bind(this));
            onStateChange.call(this)
            attached && attached.apply(this, arguments);
        }

        //页面卸载后移除监听
        component.detached = function () {
            unSubscribe && unSubscribe();
            unSubscribe = null;
            detached && detached.apply(this, arguments);
        }

        //将mapStateToProps传入methods
        component.methods=Object.assign(component.methods||{},{mapStateToProps:component.mapStateToProps})
    }

    if(component.mapDispatchToProps){
        //将mapDispatchToProps生成的函数传入methods
        component.methods=Object.assign(component.methods||{},component.mapDispatchToProps(store.dispatch))

    }
    return component
}
export {
    PageConnect,
    ComponentConnect
}