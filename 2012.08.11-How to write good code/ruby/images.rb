class FriendImages
  def initialize(user)
    @user = user
  end

  def images(sorting, page)
    decorate Image.of(friends)
      .of(friends)
      .appropriate_for(@user.age)
      .order(sorting)
      .paginate(page)
  end

  private

  def decorate(images)
    images.map { |image| ImageDecorator.new(image) }
  end
end

FriendImages.new(current_user).images('created_at', params[:page]) 
FriendImages.new(current_user).images('likes_count', params[:page]) 
