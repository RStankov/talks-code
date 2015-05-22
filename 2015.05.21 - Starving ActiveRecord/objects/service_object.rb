https://github.com/gitlabhq/gitlabhq/tree/master/app/services

module SendPrivateMessage
  extend self

  def call(message, recipient, sender)
    return :invalid unless recipient.present?
    return :invalid unless recipient.receive_private_messages?

    message = Message.new message: message, sender: sender, recipient: recipient

    return :not_saved unless message.save

    MessageMailer.user_message(message).deliver_later
    Metrics.track_create message, by: sender

    :sucess
  end
end

module UserDeactivator
  extend self

  def call(user, active: active)
    return if user.active == active

    user.update! active: active
    user.posts.update_all active: active
    user.votes.update_all active: active
    user.comments.update_all active: active
    user.following_association.update_all active: active
    user.followers_association.update_all active: active
  end
end
