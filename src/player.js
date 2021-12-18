class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.scoreMax = 50;
    this.error = 0;
    this.rank = 0;
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
    if (this.score > 50) this.score = 25;
  }

  doError() {
    this.error = Math.min(3, this.error + 1);
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
      error: this.error,
      rank: this.rank,
    });
  }
}

export default Player;
