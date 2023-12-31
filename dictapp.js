const url ="https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const soundinner = document.getElementById("ausource");

const btn = document.getElementById("finderbutton");


// An online dictionary API project that i found at youtube. I found some problems at the original version. 1- It was not running when press enter 2- The sound was not changing when word changes You can find the video here : https://www.youtube.com/watch?v=PUkgK7TI0x0&list=PLNCevxogE3fiLT6bEObGeVfHVLnttptKv&index=2&t=1322s And here is the API: https://dictionaryapi.dev/


function Dict(){

    
    

    let inputword = document.getElementById("searcher").value;
    fetch(`${url}${inputword}`)
    .then((response) => response.json())
    .then((data) => {
    
        console.log(data); //checking
        result.innerHTML = `
        <div id="dictpart">
        <div id="word_and_spelling">
            <p id="word">${inputword}</p>
            <button onclick="playSound()" id="spelling"><img id="spellingicon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/800px-Speaker_Icon.svg.png" alt="" srcset=""></button>
        </div>
        <p id="typeofword">
        ${data[0].meanings[0].partOfSpeech}
        </p>
    
    </div>
    
    <div id="definitionpart">
        <p id="definition">
        ${data[0].meanings[0].definitions[0].definition}
        </p>        
        <p id="example">${data[0].meanings[0].definitions[0].example || ""}</p>
    </div>
    `; 

    let soundatt;
    if(data[0].phonetics[0].audio ==  ''){
        soundatt= data[0].phonetics[1].audio;
        
    }
    else{
        soundatt= data[0].phonetics[0].audio;
    }    
    // there is two phonetics in data. one has an audio other does not. or either does not have. So this is being checked.

    sound.setAttribute("src",`${soundatt}`); 
    console.log(soundatt);
    console.log(sound);
    
    
    
    
    

    })
    .catch(err => {
        result.innerHTML=` <div id="word_and_spelling">
        <p id="word">Couldnt Find The Word</p>
    </div>`;
    }
    );

    

};







document.getElementById("searcher").addEventListener("keypress",(event)=>{
    if(event.key == "Enter"){
        Dict();
    }
}); 






btn.addEventListener("click",Dict);

function playSound(){




    sound.play();

    
    
};
