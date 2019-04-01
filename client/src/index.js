import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import ScrollToTop from './components/ScrollToTop';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><ScrollToTop><App /></ScrollToTop></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
