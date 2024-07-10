document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll(".hole");
  const moles = document.querySelectorAll(".mole");
  let lastHole;
  let timeUp = false;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.querySelector(".mole").classList.add("up");
    setTimeout(() => {
      hole.querySelector(".mole").classList.remove("up");
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    timeUp = false;
    peep();
    setTimeout(() => (timeUp = true), 10000);
  }

  moles.forEach((mole) => mole.addEventListener("click", bonk));

  function bonk(e) {
    if (!e.isTrusted) return;
    this.classList.remove("up");
  }

  startGame();
});
