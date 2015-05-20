import Store from './store';
import {VOTE_ADDED, VOTE_REMOVED} from '../constants/VotesStoreConstants';

class VotesStore extends Store {
  constructor(initialData) {
    super();

    this._data   = initialData || [];
    this._counts = {}
  }

  hasVoted(postId) {
    return this._data.indexOf(postId) != -1;
  }

  voteCount(postId, defaultCount) {
    return this._counts[postId] || defaultCount;
  }

  handleDispatch(payload) {
    switch(payload.action) {
      case VOTE_ADDED:
        this._data.push(payload.postId);
        this._counts[payload.postId] = payload.count;
        this.emitChange();
        break;

      case VOTE_REMOVED:
        _.pull(this._data, payload.postId);
        this._counts[payload.postId] = payload.count;
        this.emitChange();
        break;
    }
  }
};

export default new VotesStore();
