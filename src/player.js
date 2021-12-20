class Player {
  constructor(name, { score = 0, scoreMax = 50, scoreRestart = 25, disqualification = true, error = 0 } = {}) {
    this.name = name;
    this.score = score;
    this.scoreMax = scoreMax;
    this.scoreRestart = scoreRestart;
    this.error = error;
    this.rank = 0;
    this.disqualification = disqualification;

    this._print();
  }

  reset() {
    this.score = 0;
    this.error = 0;
    this.rank = 0;
  }

  setRank(rank) {
    this.rank = rank;
  }

  addScore(value) {
    this.score = this.score + value;
    this.error = 0;
    if (this.score > this.scoreMax) this.score = this.scoreRestart;
  }

  doError() {
    if (this.disqualification) this.error = Math.min(3, this.error + 1);
  }

  isDropped() {
    return this.error === 3;
  }

  isPassed() {
    return this.score === this.scoreMax;
  }

  isPlaying() {
    return !this.isPassed() && !this.isDropped();
  }

  _print() {
    console.log({
      name: this.name,
      score: this.score,
      scoreMax: this.scoreMax,
      scoreRestart: this.scoreRestart,
      error: this.error,
      rank: this.rank,
      disqualification: this.disqualification,
    });
  }
}

export default Player;
