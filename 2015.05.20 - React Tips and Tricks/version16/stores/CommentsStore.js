import Store from './store';
import {COMMENT_COUNT_UPDATED} from '../constants/CommentsStoreConstants';

class CommentsStore extends Store {
  constructor(initialData) {
    super();

    this._counts = {}
  }

  commentCount(postId, defaultCount) {
    return this._counts[postId] || defaultCount;
  }

  handleDispatch(payload) {
    switch(payload.action) {
      case COMMENT_COUNT_UPDATED:
        this._counts[payload.postId] = payload.count;
        this.emitChange();
        break;
    }
  }
};

export default new CommentsStore();
