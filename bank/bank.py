class Bank:
    def __init__(self):
        self.accounts=[]
    def add_account(self,account):
            self.accounts.append(account)
    def show_accounts(self):
         for account in self.accounts:
            print(account.acc_no,account.name,account.balance)

    def search_account(self, acc_no):
     for account in self.accounts:
        if account.acc_no == acc_no:
            return account

     return None
         