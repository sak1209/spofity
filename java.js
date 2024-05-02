console.log('start our spotify web');
let currentSong = document.getElementById("currentSong");
let songs;

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
            songs.push(element.href.split(`/songs/`)[1]);
        }
    } 
    return songs;    
}
const playMusic = (track,pause=false) => {
    currentSong.src ="/songs/" + track;
    if(!pause){
        currentSong.play();
        play.src = "pause.svg";
    }
        document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00/00:00";

    
}
function formatTime(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
        return '00:00';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}


async function main() {
    try {
        let songs= await getSongs();
        playMusic(songs[0], true);

        let songList = document.querySelector(".songList > ul");
        songs.forEach((song) => {
            let songTitle = song.replaceAll("%20", " ");
            songList.innerHTML += `
                <li>
                    <img class="invert" width="34" src="music.svg" alt="">
                    <div class="aero">
                        <div>${songTitle}</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img class="invert" src="playbtn.svg" alt="">
                    </div>
                </li>`;
        });

        Array.from(songList.getElementsByTagName("li")).forEach((li) => {
            li.addEventListener("click", (event) => {
                let songTitle = li.querySelector(".aero > div").innerHTML.trim();
                playMusic(songTitle);
            });
        });

        play.addEventListener("click", () => {
            if (currentSong.paused) {
                currentSong.play();
                play.src = "pause.svg";
            } else {
                currentSong.pause();
                play.src = "play.svg";
            }
        });

        currentSong.addEventListener("timeupdate", () => {
            document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
            document.querySelector(".gola").style.left=(currentSong.currentTime)/(currentSong.duration)*100+"%"
        });
        document.querySelector(".seekbar").addEventListener("click",(e)=>{
            document.querySelector(".gola").style.left=(e.offsetX/e.target.getBoundingClientRect().width)*100+"%"
         currentSong.currentTime =(((e.offsetX/e.target.getBoundingClientRect().width)*100)/100)*(currentSong.duration)
        
        });
        document.querySelector(".humburgercontain").addEventListener("click",()=>{
             document.querySelector(".left").style.left="0%"
             document.querySelector(".cross").style.opacity="100%"
        })
        document.querySelector(".cross").addEventListener("click",()=>{
            document.querySelector(".left").style.left="-110%"
        })
        prev.addEventListener("click",()=>{
            let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
            if([index-1]>=0){
                playMusic(songs[index-1])
            }
            
        })
        next.addEventListener("click",()=>{
            let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
            if([index+1]<songs.length){
                playMusic(songs[index+1])
            }
            else{
                playMusic(songs[0])
            }
        })
        volumepic.addEventListener("click",()=>{
            document.querySelector(".volumebar").style.opacity="100%"
        })
        document.querySelector(".volumeseek").addEventListener("click",(e)=>{
       
            document.querySelector(".volumegola").style.left=(e.offsetX/e.currentTarget.getBoundingClientRect().width)*100+"%"
            currentSong.volume =(e.offsetX/e.currentTarget.getBoundingClientRect().width)
        
        });
       
    } catch (error) {
        console.error("Error fetching or processing songs:", error);
    }
}

main();
