
class RegistrationController < ApplicationController
  def create
    @user    = User.new(user_params)
    @user.account = Account.new(account_params)
    @user.account.owner = @user

    if @user.valid? && @user.account.valid?
      @user.save!
      @user.account.save!

      AccountWasCreated.perform_later(account)

      redirect_to user_path(@user)
    else
      render :new
    end
  end
end


class RegistrationController < ApplicationController
  def create
    @registration = RegistrationForm.new(registration_param)

    if @registration.save
      redirect_to user_path(@registration.user)
    else
      render :new
    end
  end
end

class RegistrationController < ApplicationController
  def create
    @registration = RegistrationForm.new(registration_param)
    @registration.save

    respond_with @registration
  end
end

class RegistrationForm
  include ActiveModel::Model

  attr_reader :user, :account

  attr_accessor :first_name, :last_name, :email, :name, :plan, :terms_of_service

  # user validation
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, email: true

  # account validation
  validates :account_name, presence: true

  # form custom validation
  validates :plan, inclusion: {in AccountPlan::VALUES}
  validates :terms_of_service, acceptance: true

  # ensure uniqueness
  validate :ensure_unique_user_email
  validate :ensure_unique_account_name

  def initialize
    @user    = User.new
    @account = Account.new owner: @user
  end

  def update(attributes)
    attributes.each do |name, value|
      public_send "#{name}=", value
    end

    if valid? & user.update(user_attributes) && account.update(account_attributes)
      account.users << user
      AccountWasCreated.perform_later(account)
    else
      false
    end
  end

  private

  def ensure_unique_user_email
    errors.add :email, 'already taken' if User.where(email: email).any?
  end

  def ensure_unique_account_name
    errors.add :name, 'already taken' if Account.where(name: name).any?
  end

  def user_attributes
    {first_name: first_name, last_name: last_name, email: email}
  end

  def account_attributes
    {plan: plan, name: name}
  end
end

# https://github.com/RStankov/MiniForm

class RegistrationForm
  include MiniForm::Model

  model :user, attributes: %i(first_name last_name email), save: true
  model :account, attributes: %i(name plan), save: true

  attributes :terms_of_service

  validates :plan, inclusion: {in AccountPlan::VALUES}
  validates :terms_of_service, acceptance: true

  def initialize
    @user    = User.new
    @account = Account.new owner: @user
  end

  def perform
    account.users << user
    AccountWasCreated.perform_later(account)
  end
end
