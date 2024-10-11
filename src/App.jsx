import React from 'react';
import { Provider } from 'react-redux';
import store from './slices/store';
import EmployeeList from './components/EmployeeList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Provider store={store}>
            <EmployeeList />
        </Provider>
    );
};

export default App;
