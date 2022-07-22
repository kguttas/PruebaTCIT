import './App.css'
import './scss/style.scss'

//import 'bootstrap/dist/css/bootstrap.min.css';

import { registerLicense, setCulture, setCurrencyCode, loadCldr } from '@syncfusion/ej2-base';
import { createSpinner, showSpinner } from '@syncfusion/ej2-react-popups';

import * as gregorian from 'cldr-data/main/es/ca-gregorian.json';
import * as numbers from 'cldr-data/main/es/numbers.json';
import * as timeZoneNames from 'cldr-data/main/es/timeZoneNames.json';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as weekData from 'cldr-data/supplemental/weekData.json';// To load the culture based first day of week

import React, { Component } from 'react';

import Loadable from 'react-loadable';

import { Route,  Routes, BrowserRouter } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

///////////////////////////

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhhQlFac1hJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkBhUX9edHZXQGZdVEQ=');

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames, weekData);

setCulture('es');
setCurrencyCode('CLP');

let spinnerInstance = null;

const loading = (props) => {

    createSpinner({
        target: spinnerInstance,
        label: "Cargando...",
        cssClass: "e-spin-overlay"
    });

    showSpinner(spinnerInstance);

    return(
        <div className="container d-flex justify-content-center" style={{ height: "100vh" }}>
            <div className="my-auto">
                
                <div ref={spinner => {
                        spinnerInstance = spinner;
                    }} id="spinner"></div>
            </div>
        </div>
    )
}

// Home
const HomeLayout = Loadable({
    loader: () =>  import('./views/Layouts/HomeLayout'), loading
});

class App extends Component {

    UNSAFE_componentWillMount(prevProps) {

        if (this.spinnerInstance) {
            createSpinner({
                target: this.spinnerInstance
            });
            showSpinner(this.spinnerInstance);
        }
       
    }
    
    render() {
        
        return (
            
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        
                        <Route exact path={`*`} name="Home" element={<HomeLayout />} />
                        
                    </Routes>
                </BrowserRouter>
            </Provider> 
        );
    }
}

export default App;

