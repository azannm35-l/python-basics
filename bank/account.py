class account:
    def __init__(self,acc_no,name,balance=0):
        self.acc_no=acc_no
        self.name=name
        self.balance=balance
    def deposit(self,amount):
        self.amount=amount
        if amount > 0:
            self.balance+=amount
            print(f"The {amount}is succesfully deposited")
        else:
            print("invalid amount")
    def withdraw(self,amount):
     
        if amount <= 0:
            print("invalid amount")
        elif amount > self.balance:
            print("insuficient balance ")
        else:
            self.balance -=amount
            print(f"the{amount} is dedected")
    def show_balance(self):
            print("your current balance is ",{self.balance})
