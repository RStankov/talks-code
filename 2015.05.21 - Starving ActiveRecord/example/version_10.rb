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


class Size
  # ...

  class << self
    # ...

    def apply_to(model, size, gender)
      model.validates size, inclusion: {in: groups}
      model.validates gender, inclusion: {in: genders}

      model.composed_of :size,
          mapping:     [[size, size], [gender gender]],
          allow_nil:   true,
          constructor: lambda { |size, gender| new size, gender) }

      # ...
    end
  end
end

class Address
  # ...

  class << self
    def apply_to(model, field_prefix)
      # ... map address fields to model
    end
  end
end

class RegistrationForm
  include MiniForm::Model

  model :user, attributes: %i(model attributes), save: true

  attributes :terms_of_service, :password, :password_confirmation

  validates :terms_of_service, acceptance: true
  validates :password, presence: true, confirmation: true

  def initialize
    @user = User.new
  end

  def before_update
    record_registration_ip
  end

  def perform
    reset_perishable_token!
    send_wellcome_email
  end

  private

  def record_registration_ip
    # ...
  end
end

class UpdatePasswordForm
  include MiniForm::Model

  attributes :current_password, :password, :password_confirmation

  validates :password, presence: true, confirmation: true

  validate :ensure_current_password_is_correct

  attr_reader :user

  def initialize(user)
    @user = user
  end

  def preform
    # things ActiveModel::SecurePassword
    # will take care for proper password storage
    user.update! password: password
  end

  private

  def ensure_current_password_is_correct
    # ...
  end
end

class RequestPasswordResetForm
  # ...
end

class ConfirmPasswordResetForm
  # ...
end

class SomeFormWhereWeDealWithHobbies
  # ... move hobbies logic here
end

class User < ActiveRecord::Base
  #
  # long list of relationships
  #

  Size.apply_to self, :t_shirt_size, :gender

  Address.apply_to self, :payment
  Address.apply_to self, :shipping

  validates :plan, inclusion: {in AccountPlan::VALUES}

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, email: true, unique: true

  before_update :enqueue_avatar_update, if: :image_changed?

  mount_uploader :avatar, Users::AvatarUploader

  private

  def enqueue_avatar_update
    # ...
  end
end

