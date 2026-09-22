const initialAccounts = [
  { acc_no: 2243, name: 'Azan', balance: 1000000 },
  { acc_no: 2244, name: 'Faizan', balance: 2000000 },
  { acc_no: 2245, name: 'Mubeen', balance: 3000000 }
];

let accounts = [...initialAccounts];
let currentAccount = null;

const accountCard = document.getElementById('accountCard');
const actions = document.getElementById('actions');
const message = document.getElementById('message');

function setMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle('show', true);
  message.classList.toggle('error', isError);
}

function resetMessage() {
  message.textContent = '';
  message.classList.remove('show');
  message.classList.remove('error');
}

function renderAccount(account) {
  if (!account) {
    accountCard.className = 'account-card empty-state';
    accountCard.innerHTML = `
      <h2>Account details</h2>
      <p>Select an account to view information.</p>
    `;
    actions.classList.add('hidden');
    return;
  }

  currentAccount = account;
  accountCard.className = 'account-card';
  accountCard.innerHTML = `
    <h2>Account details</h2>
    <div class="account-meta">
      <div>
        <p><strong>Account number</strong></p>
        <p>${account.acc_no}</p>
      </div>
      <div>
        <p><strong>Holder name</strong></p>
        <p>${account.name}</p>
      </div>
    </div>
    <div class="account-balance">$${account.balance.toLocaleString()}</div>
  `;
  actions.classList.remove('hidden');
}

function searchAccount(accountNumber) {
  const found = accounts.find((account) => account.acc_no === Number(accountNumber));

  if (!found) {
    currentAccount = null;
    renderAccount(null);
    setMessage('Account not found.', true);
    return;
  }

  renderAccount(found);
  setMessage(`Account ${found.acc_no} is active.`);
}

function addAccount(event) {
  event.preventDefault();

  const nameInput = document.getElementById('newName');
  const balanceInput = document.getElementById('newBalance');

  const name = nameInput.value.trim();
  const balance = Number(balanceInput.value);

  if (!name || Number.isNaN(balance) || balance < 0) {
    setMessage('Please enter a valid name and opening balance.', true);
    return;
  }

  const nextAccountNumber = accounts.length
    ? Math.max(...accounts.map((account) => account.acc_no)) + 1
    : 1001;

  const newAccount = {
    acc_no: nextAccountNumber,
    name,
    balance
  };

  accounts.push(newAccount);
  nameInput.value = '';
  balanceInput.value = '';
  renderAccount(newAccount);
  setMessage(`New account ${nextAccountNumber} created successfully.`);
}

function handleDeposit(event) {
  event.preventDefault();

  if (!currentAccount) {
    setMessage('Search for an account first.', true);
    return;
  }

  const amountInput = document.getElementById('depositAmount');
  const amount = Number(amountInput.value);

  if (!Number.isFinite(amount) || amount <= 0) {
    setMessage('Enter a valid deposit amount greater than zero.', true);
    return;
  }

  currentAccount.balance += amount;
  amountInput.value = '';
  renderAccount(currentAccount);
  setMessage(`$${amount.toLocaleString()} deposited successfully.`);
}

function handleWithdraw(event) {
  event.preventDefault();

  if (!currentAccount) {
    setMessage('Search for an account first.', true);
    return;
  }

  const amountInput = document.getElementById('withdrawAmount');
  const amount = Number(amountInput.value);

  if (!Number.isFinite(amount) || amount <= 0) {
    setMessage('Enter a valid withdrawal amount greater than zero.', true);
    return;
  }

  if (amount > currentAccount.balance) {
    setMessage('Insufficient balance for this withdrawal.', true);
    return;
  }

  currentAccount.balance -= amount;
  amountInput.value = '';
  renderAccount(currentAccount);
  setMessage(`$${amount.toLocaleString()} withdrawn successfully.`);
}

function resetDemo() {
  accounts = [...initialAccounts];
  currentAccount = null;
  renderAccount(null);
  document.getElementById('searchForm').reset();
  document.getElementById('addAccountForm').reset();
  document.getElementById('depositForm').reset();
  document.getElementById('withdrawForm').reset();
  resetMessage();
}

document.getElementById('searchForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const accountNumber = document.getElementById('accountNumber').value;
  if (!accountNumber) {
    setMessage('Please enter an account number.', true);
    return;
  }
  searchAccount(accountNumber);
});

document.getElementById('addAccountForm').addEventListener('submit', addAccount);
document.getElementById('depositForm').addEventListener('submit', handleDeposit);
document.getElementById('withdrawForm').addEventListener('submit', handleWithdraw);
document.getElementById('resetButton').addEventListener('click', resetDemo);

renderAccount(null);
