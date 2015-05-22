module TopUsers
  extend self

  COUNT = 10

  def all
    User.find_by_sql <<-SQL

    SQL
  end
end

module UserSearch
  include SearchObject.module

  scope { User.all }

  option(:name)  { |scope, value| scope.where 'first_name LIKE ? OR last_name LIKE ?', value, value }
  option(:email) { |scope, value| scope.where email: value }

  # ...

end

class UserPresenter < SimpleDelegator
  def name
    "#{first_name} #{last_name}"
  end

  def status
    if trashed?
      'Deleted user'
    else if !active?
      'Inactive user'
    else if spammer?
      'Spammer'
    else
      'Normal user'
    end
  end
end

module UserDeactivator
  def call(user, activate:)
    # moved user.activate / user.deactivate
  end
end

class User < ActiveRecord::Base
  #
  # long list of relationships
  #

  validates :plan, inclusion: {in AccountPlan::VALUES}
  validates :terms_of_service, acceptance: true

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, email: true, unique: true

  validates :password, presence: true if: :password_required?
  validate :old_password_correct, on: :update

  validates :gender, in: %w(m f u)

  validates :terms_of_service, acceptance: true, on: :create

  before_create :record_registration_ip

  after_create :reset_perishable_token!
  after_create :send_wellcome_email

  before_update :send_password_instructions, if: :password_token_changed?

  before_update :enqueue_avatar_update, if: :image_changed?

  accepts_nested_attributes_for :hobbies, allow_destroy: true

  mount_uploader :avatar, Users::AvatarUploader

  def tshirt_size
    # ...
  end

  def shipping_address
    # ...
  end

  def payment_address
    # ...
  end

  def require_password_change(password)
    # ...
  end

  private

  def password_required?
    # ...
  end

  def record_registration_ip
    # ...
  end

  def old_password_correct
    # ...
  end

  def enqueue_avatar_update
    # ...
  end
end

