import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher';

class Store extends EventEmitter {
  constructor() {
    super();

    this.dispatchToken = AppDispatcher.register((payload) => {
      this.handleDispatch(payload);
    });
  }

  addChangeListener(cb) {
    this.addListener(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  handleDispatch(/* payload */) {
    // intentionally left blank
  }
};

export default Store;
