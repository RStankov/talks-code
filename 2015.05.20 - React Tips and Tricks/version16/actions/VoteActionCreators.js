import AppDispatcher from '../dispatcher';
import {VOTE_ADDED, VOTE_REMOVED} from '../constants/VotesStoreConstants';
import VoteAPIUtils from '../utils/VoteAPIUtils';
import VotesStore from '../stores/VotesStore';

export default {
  toggleVote: function(postId, currentCount) {
    if (VotesStore.hasVoted(postId)) {
      VoteAPIUtils.remove(postId);

      AppDispatcher.dispatch({
        action: VOTE_REMOVED,
        postId: postId,
        count: currentCount - 1
      });
    } else {
      VoteAPIUtils.remove(postId);

      AppDispatcher.dispatch({
        action: VOTE_ADDED,
        postId: postId,
        count: currentCount + 1
      });
    }
  }
};
