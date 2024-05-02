console.log('start our spotify web');
let currentSong = document.getElementById("currentSong");

async function getSongs() {
    let response = await fetch("http://127.0.0.1:5501/songs/");
    let htmlText = await response.text();
    console.log(htmlText);

    let div = document.createElement("div");
    div.innerHTML = htmlText;

    let links = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < links.length; index++) {
        const element = links[index];
        if (element.href.endsWith(".mp3")) {           
            songs.push(element.href.split("/songs/")[1]);
        }
    } 
    return songs;    
}
const playMusic = (track) => {
    currentSong.src = "/songs/" + track;
    currentSong.play();
    play.src = "pause.svg";
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}


async function main() {
    let songs = await getSongs();
   

    let songul=document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML=songul.innerHTML+`<li><img class="invert" width="34" src="music.svg" alt="">
        <div class=".aero">
            <div> ${song.replaceAll("%20", " ")}</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img class="invert" src="playbtn.svg" alt="">
        </div> </li>`;
    }
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })
// Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
//     e.addEventListener("click",element=>{
//         console.log(e.getElementsByTagName(".aero").firstElementChild.innerHTML)
//     playMusic(e.getElementsByTagName(".aero").firstElementChild.innerHTML.trim())
// })
// });
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", (element) => {
        let songTitle = e.querySelector(".aero > div").innerHTML.trim();
        playMusic(songTitle);
    });
});

}
main();