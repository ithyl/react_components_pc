import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import BasicLayout from './Components/BasicStyle/BasicLayout'
import { RootStore, history } from './Store'
import {utils} from './Utils'
function init(){
    // utils.getHttpStat('http://113.125.201.131:9300/group1/qiguan/2020021814225838/newzzjg/orgimg_/20200401/16//32/4//1%20(7).jpg?download=0')
    ReactDOM.render(
        <BasicLayout history={history} store={RootStore}/>, document.getElementById('root')
    )
}
init()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
