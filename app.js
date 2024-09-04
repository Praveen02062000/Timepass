const mainDiv = document.querySelector(".main")
const startPage = document.querySelector(".startpage");
const startImageLoad = document.querySelector(".start-img");
const startTitle = document.querySelector(".start-title");
const startBtn = document.querySelector("#start-game-btn");
const InitPage = document.querySelector(".init-btn");
const GameBoard = document.querySelector(".game-board");
const inputX = document.querySelector("#floatingInput1");
const inputy = document.querySelector("#floatingInput2");
const validate = document.querySelector("#validatebtn");
const alertBox = document.querySelector("#alert");
const leftHand = document.querySelector("#left-img1");
const rightHand = document.querySelector("#right-img1");
const MainStart = document.querySelector("#main-start");
const PlayBoard = document.querySelector(".play-board");
const userForm = document.querySelector(".user-form");
const before = document.querySelector(".before");
const leftImage = document.querySelector("#left-img");
const rightImage = document.querySelector("#right-img");
const nameBoard = document.querySelector(".name-board").children;
const winAlert = document.querySelector("#win-alert");
const restartBtn = document.querySelector("#restart");




restartBtn.addEventListener('click', () => {
    window.location.reload()
})


function autoClick() {
    $("#download").click();
}

$(document).ready(function () {
    var element = $(".play-board");

    $("#download").on('click', function () {

        html2canvas(element, {
            onrendered: function (canvas) {
                var imageData = canvas.toDataURL("image/jpg");
                var newData = imageData.replace(/^data:image\/jpg/, "data:application/octet-stream");
                $("#download").attr("download", "image.jpg").attr("href", newData);
            }
        });

    });
});





class GameDetails {
    setLS() {
        const ls = window.localStorage;
        if (ls.getItem("rps") === null) {
            ls.setItem("rps", JSON.stringify({}))
        }
    }
    constructor() {
        this.usernameX = null;
        this.usernameY = null;
        this.WinMsg = "";
        this.score = { x: 0, y: 0, z: 0 };
        this.gamestart = false;
        this.loadStartflag = false;
        this.btnboardFlag = false;
        this.ErrorText = false;
        this.userdetails = false;
        this.userFormFlag = false;
        this.loopPlaying = false;
        this.colors = ["red", "yellow", "green", "orange"];
        this.types = ["Rocks", "Papers", "Scissors"];
        this.setLS()
        this.assertImage = [
            { id: 1, link: "./Assets/rock.png", type: "rock" },
            { id: 2, link: "./Assets/paper.png", type: "paper" },
            { id: 3, link: "./Assets/sicssor.png", type: "scissors" }
        ]

    }

    setterUsername(xname, yname) {
        this.usernameX = xname;
        this.usernameY = yname;
    }

    shakeReturn() {
        return (Math.random() * (this.types.length - 1)).toFixed(0)
    }

    getterUsername() {
        return { x: this.usernameX, y: this.usernameY }
    }

    setterGameFlag() {
        this.gamestart = !this.gamestart;
        this.loadStartflag = !this.loadStartflag;
    }

    buttonStyle() {
        if (this.loopPlaying) {
            // console.log(this.loopPlaying);

            MainStart.innerHTML = "Replay";
            MainStart.style.display = "block";
            MainStart.addEventListener('click', () => {
                if (this.loopPlaying) {
                    winAlert.style.display = "none";
                    leftHand.style.display = "block";
                    rightHand.style.display = "block";
                    leftImage.style.display = "none";
                    rightImage.style.display = "none";
                    leftImage.src = "";
                    rightImage.src = "";
                    MainStart.innerHTML = "start"
                    this.loopPlaying = false;
                }
            })
        }
    }

    scoreDisplay() {
        const x_playerElement = nameBoard[0].children[0];
        const y_playerElement = nameBoard[1].children[0];
        const drawElement = nameBoard[2].children[0];

        x_playerElement.innerHTML = `${this.usernameX} : ${this.score.x}`;
        y_playerElement.innerHTML = `${this.usernameY} : ${this.score.y}`;
        drawElement.innerHTML = `Draw : ${this.score.z}`;

    }

    winAlertFun(value, type) {
        if (type === "win") {
            winAlert.innerHTML = `Winner is ${value}`;
            winAlert.style.display = "block";
        } else {
            winAlert.innerHTML = `Match ${value}`;
            winAlert.style.display = "block";
        }
    }

    playGame() {

        const xcount = this.shakeReturn();
        const ycount = this.shakeReturn();
        const x_playervalue = this.types[xcount].toLowerCase();
        const Y_playervalue = this.types[ycount].toLowerCase();
        this.loopPlaying = true;
        leftImage.style.display = "block";
        rightImage.style.display = "block";



        if (x_playervalue === "rocks" && Y_playervalue === "papers") {
            leftImage.src = this.assertImage[xcount].link;
            rightImage.src = this.assertImage[ycount].link;
            this.winAlertFun(this.usernameY, 'win');
            this.score.y += 1;
            this.scoreDisplay()
        }
        else if (x_playervalue === "papers" && Y_playervalue === "rocks") {
            leftImage.src = this.assertImage[xcount].link;
            rightImage.src = this.assertImage[ycount].link;
            this.winAlertFun(this.usernameX, 'win');
            this.score.x += 1;
            this.scoreDisplay()
        }
        else if (x_playervalue === "rocks" && Y_playervalue === "scissors") {
            leftImage.src = this.assertImage[xcount].link;
            rightImage.src = this.assertImage[ycount].link;
            this.winAlertFun(this.usernameX, 'win');
            this.score.x += 1;
            this.scoreDisplay()
        }
        else if (x_playervalue === "scissors" && Y_playervalue === "rocks") {
            leftImage.src = this.assertImage[xcount].link;
            rightImage.src = this.assertImage[ycount].link;
            this.winAlertFun(this.usernameY, 'win');
            this.score.y += 1;
            this.scoreDisplay()
        }

        else if (x_playervalue === "scissors" && Y_playervalue === "papers") {
            leftImage.src = this.assertImage[xcount].link;
            rightImage.src = this.assertImage[ycount].link;
            this.winAlertFun(this.usernameX, 'win');
            this.score.x += 1;
            this.scoreDisplay()
        }
        else if (x_playervalue === "papers" && Y_playervalue === "scissors") {
            leftImage.src = this.assertImage[xcount].link;
            rightImage.src = this.assertImage[ycount].link;
            this.winAlertFun(this.usernameY, 'win');
            this.score.y += 1;
            this.scoreDisplay()
        }
        else if (x_playervalue === "papers" && Y_playervalue === "papers") {
            leftImage.src = this.assertImage[xcount].link;
            rightImage.src = this.assertImage[ycount].link;
            this.winAlertFun('Draw', 'z');
            this.score.z += 1;
            this.scoreDisplay()
        }
        else if (x_playervalue === "scissors" && Y_playervalue === "scissors") {
            leftImage.src = this.assertImage[xcount].link;
            rightImage.src = this.assertImage[ycount].link;
            this.winAlertFun('Draw', 'z');
            this.score.z += 1;
            this.scoreDisplay()
        }
        else if (x_playervalue === "rocks" && Y_playervalue === "rocks") {
            leftImage.src = this.assertImage[xcount].link;
            rightImage.src = this.assertImage[ycount].link;
            this.winAlertFun('Draw', 'z');
            this.score.z += 1;
            this.scoreDisplay()
        }

        // console.log(this.loopPlaying);

        this.buttonStyle()

    }

    displayplayBoard() {
        if (this.userdetails && this.userFormFlag) {
            userForm.style.display = "none";

            PlayBoard.style.display = "flex";
            MainStart.addEventListener("click", () => {
                if (!this.loopPlaying) {
                    MainStart.style.display = "none";
                    leftHand.setAttribute('class', 'shake1');
                    rightHand.setAttribute('class', 'shake2');

                    setTimeout(() => {
                        leftHand.style.display = "none";
                        rightHand.style.display = "none";
                        leftHand.setAttribute('class', 'withoutshake1');
                        rightHand.setAttribute('class', 'withoutshake2')
                        this.playGame()

                    }, 2000);
                }
            })
        }
    }


    displayBtnBoard() {
        if (this.btnboardFlag) {
            GameBoard.style.display = "flex";
            validate.addEventListener('click', () => {
                const xv = inputX.value;
                const yv = inputy.value;
                if (xv.length > 0 && yv.length > 0) {
                    this.ErrorText = false;
                    alertBox.style.display = "none"
                    this.usernameX = xv;
                    this.usernameY = yv;
                    this.userdetails = true;
                    this.userFormFlag = true;
                    this.displayplayBoard()
                    this.scoreDisplay()


                } else {
                    if (yv.length === 0 && xv.length > 0) {
                        this.ErrorText = true
                        if (this.ErrorText) {
                            alertBox.style.display = "block"
                        }
                        alertBox.innerHTML = "Enter the Y_player Name !";

                    }
                    else if (xv.length === 0 && yv.length > 0) {
                        this.ErrorText = true
                        if (this.ErrorText) {
                            alertBox.style.display = "block"
                        }
                        alertBox.innerHTML = "Enter the X_player Name !"
                    }
                    else if (yv.length === 0 && xv.length === 0) {
                        this.ErrorText = true
                        if (this.ErrorText) {
                            alertBox.style.display = "block"
                        }
                        alertBox.innerHTML = `Enter the X_player Name ! <br/> Enter the Y_player Name!`
                    }
                }
            })

        }
    }


    loader() {
        if (this.gamestart && this.loadStartflag) {
            let counterImages = 0;
            startPage.style.display = "flex";
            const animationload = setInterval(() => {
                if (counterImages < this.assertImage.length) {
                    startPage.style.backgroundColor = this.colors[counterImages];
                    startImageLoad.src = this.assertImage[counterImages].link;
                    startTitle.innerHTML = this.assertImage[counterImages].type;
                    counterImages++;
                } else {
                    clearInterval(animationload)
                    startPage.style.display = "none";
                    this.btnboardFlag = true
                    this.displayBtnBoard()

                }
            }, 600);
        }
    }

    startGameBtn() {
        startBtn.addEventListener('click', () => {
            if (!this.startflag) {
                startBtn.innerHTML = "Waiting......."
                setTimeout(() => {
                    InitPage.style.display = "none";
                    this.setterGameFlag();
                    this.loader()
                }, 200);
            }
        })

    }
}





function StartApp() {
    const user = new GameDetails();
    user.startGameBtn()
}



StartApp();
