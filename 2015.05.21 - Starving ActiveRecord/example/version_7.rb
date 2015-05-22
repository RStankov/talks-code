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

  attributes :terms_of_service

  validates :terms_of_service, acceptance: true

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

  validates :password, presence: true if: :password_required?
  validate :old_password_correct, on: :update

  before_update :send_password_instructions, if: :password_token_changed?

  before_update :enqueue_avatar_update, if: :image_changed?

  accepts_nested_attributes_for :hobbies, allow_destroy: true

  mount_uploader :avatar, Users::AvatarUploader

  def require_password_change(password)
    # ...
  end

  private

  def password_required?
    # ...
  end

  def old_password_correct
    # ...
  end

  def enqueue_avatar_update
    # ...
  end
end

