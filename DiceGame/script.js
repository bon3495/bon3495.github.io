'use strict';

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const img = document.querySelector('.dice');
const curScores = [...document.querySelectorAll('.current-score')];
const players = [...document.querySelectorAll('.player')];
const scores = [...document.querySelectorAll('.score')];

class Player {
  constructor() {
    this.score = 0;
  }
}

class App {
  #player1 = new Player();
  #player2 = new Player();
  #players = [this.#player1, this.#player2];
  #curScore = 0;
  #curPlayer = 0;
  #isPlaying = true;
  constructor() {
    this._init();
    rollBtn.addEventListener('click', this._rollDice.bind(this));
    holdBtn.addEventListener('click', this._holdScore.bind(this));
    newGameBtn.addEventListener('click', this._init.bind(this));
  }
  _rollDice() {
    if (!this.#isPlaying) return;
    const randomNum = Math.floor(Math.random() * 6 + 1);
    img.src = `dice-${randomNum}.png`;
    img.classList.remove('hidden');
    if (randomNum === 1) {
      this._changeActivePlayer();
    } else {
      this.#curScore += randomNum;
      curScores[this.#curPlayer].textContent = this.#curScore;
    }
  }
  _changeActivePlayer() {
    if (!this.#isPlaying) return;
    players.forEach(player => player.classList.remove('player--active'));
    curScores[this.#curPlayer].textContent = this.#curScore = 0;
    this.#curPlayer = this.#curPlayer === 0 ? 1 : 0;
    players[this.#curPlayer].classList.add('player--active');
  }
  _holdScore() {
    if (!this.#isPlaying) return;
    this.#players[this.#curPlayer].score += this.#curScore;
    scores[this.#curPlayer].textContent = this.#players[this.#curPlayer].score;
    this._checkWinner();
    this._changeActivePlayer();
  }
  _checkWinner() {
    if (this.#players[this.#curPlayer].score < 20) return;
    img.classList.add('hidden');
    players[this.#curPlayer].classList.remove('player--active');
    players[this.#curPlayer].classList.add('player--winner');
    this.#isPlaying = !this.#isPlaying;
  }
  _init() {
    this.#curPlayer = this.#curScore = 0;
    this.#isPlaying = true;
    this.#players.forEach(player => (player.score = 0));
    curScores.forEach(curS => (curS.textContent = 0));
    scores.forEach(score => (score.textContent = 0));
    players.forEach(player => player.classList.remove('player--winner'));
    players.forEach(player => player.classList.remove('player--active'));
    players[this.#curPlayer].classList.add('player--active');
    img.classList.add('hidden');
  }
}
const app = new App();
