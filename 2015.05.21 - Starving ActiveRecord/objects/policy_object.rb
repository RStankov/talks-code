class CanTransferAmountPolicy?
  def initialize(user)
    @user
  end

  def can_transfer?(amount)
    return false unless @user.active?
    return false unless @user.enough_balance?(amount)
    return false unless Rules.is_working_day?
    return false unless Rules.system_operational?

    true
  end
end
