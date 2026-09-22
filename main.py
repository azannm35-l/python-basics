from bank.account import account
from bank.bank import Bank 

account1=account(2243,"Azan",1000000)

account2=account(2244,"faizan",2000000)

account3=account(2244,"mubeen",3000000)
bank=Bank()

bank.add_account(account1)

bank.add_account(account2)

bank.add_account(account3)

acc_no=int(input("Enter your account number:"))
result=bank.search_account(acc_no)
if result:
    print("Account found")
    print("Account_no",result.acc_no)
    print("account name =",result.name)
    print("Account balance",result.balance)
else:
    print("account not found ok")
# this is An bank system = by Azan 

