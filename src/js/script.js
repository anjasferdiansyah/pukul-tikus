const tanah = document.querySelectorAll(".tanah");
console.log(tanah);
const tikus = document.querySelectorAll(".tikus");
const scoreBoard = document.querySelector("#score");
const whack = document.querySelector("#whack");

let selesai;
let score;

// untuk random tanah yang akan muncul tikus
const randomizeMunculTikus = (tanah) => {
  let tanahSebelumnya;
  let t = Math.floor(Math.random() * tanah.length);
  let tanahRandom = tanah[t];
  if (tanahRandom == tanahSebelumnya) {
    return randomizeMunculTikus(tanah);
  }
  tanahSebelumnya = tanahRandom;
  return tanahRandom;
};

//  function untuk muncul tikus
const munculTikus = () => {
  let tanahRandom = randomizeMunculTikus(tanah);
  tanahRandom.classList.add("muncul");

  setTimeout(() => {
    tanahRandom.classList.remove("muncul");
    if (!selesai) {
      munculTikus();
    }
  }, tingkatKesulitan());
};

// function untuk menentukan tingkat kesulitan
const tingkatKesulitan = () => {
  if (score < 10) {
    return waktuRandom(1000, 2000);
  } else if (score >= 10 && score < 20) {
    return waktuRandom(500, 1000);
  } else if (score >= 20) {
    return waktuRandom(300, 600);
  }
};

// function untuk menentukan waktu munculnya tikus
const waktuRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

// function pukul
function pukul(t) {
  score++;
  scoreBoard.innerHTML = score;
  this.parentNode.classList.remove("muncul");

  this.classList.toggle("pukul");
  whack.play();
  setTimeout(() => {
    this.classList.remove("pukul");
  }, 300);
}

tikus.forEach((t) => {
  t.addEventListener("click", pukul);
});

const mulaiGame = () => {
  selesai = false;
  score = 0;
  scoreBoard.innerHTML = 0;
  munculTikus();
  setTimeout(() => {
    selesai = true;
    alert("Permainan Berakhir");
  }, 60000);
};
