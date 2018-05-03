import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import ChatRoomApp from './chatroomapp';
import './index.css';

ReactDOM.render(<ChatRoomApp />, document.getElementById('root'));
registerServiceWorker();
