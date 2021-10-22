'use strict';

// BANKIST APP
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const login = document.querySelector('.login');
const transferForm = document.querySelector('.form--transfer');
const loanForm = document.querySelector('.form--loan');
const closeForm = document.querySelector('.form--close');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
/////////////////////////////////////////////////
class Account {
  // prettier-ignore
  constructor(owner, movements, interestRate, pin, movementsDates, currency, locale) {
    this.owner = owner;
    this.movements = movements;
    this.interestRate = interestRate;
    this.pin = pin;
    this.movementsDates = movementsDates;
    this.currency = currency;
    this.locale = locale;
  }
}

const acc1 = new Account(
  'Jonas Schmedtmann',
  [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  1.2,
  1111,
  [
    '2019-11-18T21:31:17.178Z',
    '2021-10-07T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2021-10-06T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-10-04T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2021-10-05T10:51:36.790Z',
  ],
  'EUR',
  'pt-PT' // de-DE);
);

const acc2 = new Account(
  'Jessica Davis',
  [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  1.5,
  2222,
  [
    '2019-11-01T13:15:33.035Z',
    '2021-10-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  'JPY',
  'ja-JP'
);

const acc3 = new Account(
  'Steven Thomas Williams',
  [200, 1340, -300, 50, 400, -720],
  0.7,
  3333,
  [
    '2021-09-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
  ],
  'USD',
  'en-US'
);

const acc4 = new Account(
  'Sarah Smith',
  [230, -1200, 700, -450, 2100, 120, -780, 1180],
  1,
  4444,
  [
    '2021-10-18T21:31:17.178Z',
    '2021-10-16T07:42:02.383Z',
    '2021-10-20T09:15:04.904Z',
    '2021-10-11T10:17:24.185Z',
    '2021-10-19T14:11:59.604Z',
    '2021-10-05T17:01:17.194Z',
    '2021-07-11T23:36:17.929Z',
    '2021-10-18T10:51:36.790Z',
  ],
  'VND',
  'vi-VN'
);

class App {
  #accounts = [];
  #curAcc;
  #receiver;
  #isSort = false;
  #sortMap = new Map();
  timer;
  now = new Date();
  constructor() {
    // prettier-ignore
    this._addUser(acc1)._addUser(acc2)._addUser(acc3)._addUser(acc4)._addUserId();
    btnLogin.addEventListener('click', this._loginAccount.bind(this));
    btnTransfer.addEventListener('click', this._transfer.bind(this));
    btnLoan.addEventListener('click', this._requestLoan.bind(this));
    btnClose.addEventListener('click', this._closeAccount.bind(this));
    btnSort.addEventListener('click', this._sortMoverments.bind(this));
  }

  // Method thêm account vào mảng
  _addUser(account) {
    this.#accounts.push(account);
    return this;
  }

  // Method thêm id đăng nhập cho từng account
  _addUserId() {
    this.#accounts.forEach(account => {
      account.userId = account.owner
        .split(' ')
        .map(i => i[0].toLowerCase())
        .join('');
    });
  }

  // Method tính tổng tiền, tiền vào, tiền ra, lãi suất
  _calcSummary(account) {
    // calc balance
    account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
    // calc income
    account.income = account.movements
      .filter(movement => movement > 0)
      .reduce((acc, cur) => acc + cur, 0);
    // calc spend
    account.spend = account.movements
      .filter(movement => movement < 0)
      .reduce((acc, cur) => acc + cur, 0);
    // calc interest
    account.interest = account.movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * account.interestRate) / 100)
      .filter(dep => dep >= 1)
      .reduce((acc, cur) => acc + cur, 0);
  }

  // Method render lịch sử giao dịch của current account, có sắp xếp thứ tự giảm dần theo tổng số tiền
  _renderMovements() {
    containerMovements.textContent = '';
    // Set movements và movementsDates vào Map this.#sortMap để thực hiện công việc sắp xếp
    // {
    //    movements[i] : movementsDates[i]
    //    ...
    // }
    this.#curAcc.movements.forEach((mov, i) =>
      this.#sortMap.set(mov, this.#curAcc.movementsDates[i])
    );
    // Chuyển this.#sortMap về array để dùng method sort() trong array
    const sortMap = [...this.#sortMap].sort((a, b) => a[0] - b[0]);

    // Kiểm tra this.#isSort true/false để gán array tương ứng.
    // Nếu true -> array đã sắp xếp, nếu false -> array chưa sắp xếp
    const movs = this.#isSort ? sortMap : [...this.#sortMap];

    // Mỗi một phần tử của movs luôn là một mảng con có 2 phần tử [movements[i],movementsDates[i]].
    // Dùng destructuring tách thành 2 phần tử để render lịch sử giao dịch lên giao diện
    movs.forEach(([mov, date], i) => {
      const movDate = new Date(date);
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
        i + 1
      } ${type}</div>
        <div class="movements__date">${this._checkDayPassed(
          this.now,
          movDate
        )}</div>
        <div class="movements__value">${this._formatCurrency(mov)}</div>
      </div>
      `;
      containerMovements.insertAdjacentHTML('afterbegin', html);
    });
  }

  _renderInterface(account) {
    // render Tổng tiền
    labelBalance.textContent = `${this._formatCurrency(account.balance)}`;
    // render Tổng thu nhập
    labelSumIn.textContent = `${this._formatCurrency(account.income)}`;
    // render Tổng chi tiêu
    labelSumOut.textContent = `${this._formatCurrency(
      Math.abs(account.spend)
    )}`;
    // render Lãi suất
    labelSumInterest.textContent = `${this._formatCurrency(account.interest)}`;
    // gọi hàm render lịch sử giao dịch
    this._renderMovements();
  }

  // render Thời gian hiện tại
  _renderDate() {
    let nowHour;
    // Kiểm tra giờ để render các buổi trong ngày.
    // 0 - 12h : sáng, 12 - 18h : chiều, 18h - 24h: tối
    if (this.now.getHours() <= 12) nowHour = 'Morning';
    else if (this.now.getHours() <= 18) nowHour = 'Afternoon';
    else nowHour = 'Evening';
    labelWelcome.textContent = `Good ${nowHour}, ${
      this.#curAcc.owner.split(' ')[0]
    }!`;

    // Render thời gian hiện tại bằng ' Intl.DateTimeFormat '
    labelDate.textContent = `${new Intl.DateTimeFormat(this.#curAcc.locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(this.now)}`;
  }

  // Kiểm tra số ngày đã qua so với thời gian hiện tại
  _checkDayPassed(date1, date2) {
    const date = Math.floor((date1 - date2) / (60 * 60 * 24 * 1000));
    if (date < 1) return `Today`;
    if (date === 1) return `Yesterday`;
    if (date <= 7) return `${date} days ago`;
    return new Intl.DateTimeFormat(this.#curAcc.locale).format(date2);
  }

  // Format tiền tệ bằng ' Intl.NumberFormat '
  _formatCurrency(value) {
    return new Intl.NumberFormat(this.#curAcc.locale, {
      style: 'currency',
      currency: this.#curAcc.currency,
    }).format(value);
  }

  _startLogOutTimer() {
    let time = 600;
    const tick = () => {
      const min = (Math.trunc(time / 60) + '').padStart(2, 0);
      const sec = ((time % 60) + '').padStart(2, 0);
      labelTimer.textContent = `${min} : ${sec}`;
      if (time === 0) {
        clearInterval(timer);
        containerApp.style.opacity = 0;
        labelWelcome.textContent = 'Log in to get started';
      }
      time--;
    };
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
  }

  ///////////// Event Handlers /////////////
  // Login
  _loginAccount(e) {
    e.preventDefault();
    const loginId = inputLoginUsername.value;
    const loginPin = +inputLoginPin.value;
    this.#curAcc = this.#accounts.find(acc => acc.userId === loginId);
    if (this.#curAcc?.pin !== loginPin)
      return alert('Wrong id or password, try again!');
    containerApp.style.opacity = 1;
    this._renderDate();
    this._calcSummary(this.#curAcc);
    this._renderInterface(this.#curAcc);
    login.reset();
    transferForm.reset();
    loanForm.reset();
    closeForm.reset();
    inputLoginUsername.blur();
    inputLoginPin.blur();
    if (this.timer) clearInterval(this.timer);
    this.timer = this._startLogOutTimer();
  }

  // Transfer
  _transfer(e) {
    e.preventDefault();
    const inputUser = inputTransferTo.value;
    const inputAmount = +inputTransferAmount.value;
    this.#receiver = this.#accounts.find(
      acc => acc.userId === inputUser && acc.userId !== this.#curAcc.userId
    );
    if (
      !this.#receiver ||
      this.#curAcc.balance < inputAmount ||
      inputAmount < 0
    )
      return alert('Transfer error, try again!');
    this.#curAcc.movements.push(-inputAmount);
    this.#receiver.movements.push(inputAmount);
    // Thêm thời gian chuyển tiền vào tài khoản hiện tại
    this.#curAcc.movementsDates.push(new Date().toISOString());
    // Thêm thời gian chuyển tiền vào tài khoản nhận
    this.#receiver.movementsDates.push(new Date().toISOString());
    this._calcSummary(this.#curAcc);
    this._renderInterface(this.#curAcc);
    transferForm.reset();
    inputTransferTo.blur();
    inputTransferAmount.blur();
    clearInterval(this.timer);
    this.timer = this._startLogOutTimer();
  }

  // Loan
  _requestLoan(e) {
    e.preventDefault();
    const inputLoan = +inputLoanAmount.value;
    const isError =
      inputLoan < 0 ||
      this.#curAcc.movements.every(mov => mov < inputLoan * 0.1);
    if (isError) return alert('Request loan fail, try again!');
    setTimeout(() => {
      // Thêm số tiền mới vay vào tài khoản hiện tại
      this.#curAcc.movements.push(inputLoan);

      // Thêm thời gian mượn vào tài khoản hiện tại
      this.#curAcc.movementsDates.push(new Date().toISOString());

      this._calcSummary(this.#curAcc);
      this._renderInterface(this.#curAcc);
    }, 2000);
    loanForm.reset();
    inputLoanAmount.blur();
    clearInterval(this.timer);
    this.timer = this._startLogOutTimer();
  }

  // Close account
  _closeAccount(e) {
    e.preventDefault();
    const inputUser = inputCloseUsername.value;
    const inputPin = +inputClosePin.value;
    if (inputUser !== this.#curAcc.userId || inputPin !== this.#curAcc.pin)
      return alert('Wrong user id or password, try again!');
    this.#accounts = this.#accounts.filter(acc => acc !== this.#curAcc);
    console.log(this.#accounts);
    containerApp.style.opacity = 0;
    closeForm.reset();
    inputCloseUsername.blur();
    inputClosePin.blur();
  }

  // Sort by movements
  _sortMoverments(e) {
    e.preventDefault();
    this.#isSort = !this.#isSort;
    this._renderMovements();
  }
}

const app = new App();
