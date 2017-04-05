var famousPeople = [{
    title: "Field Marshal",
    name: "Erwin Rommel",
    bio: "Popularly known as the Desert Fox, Rommel was a senior commander in the Wehrmacht. He famously held off the Allied forces in Africa for two years before returning to Germany, where he was inplicated in a plot against Hitler.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Bundesarchiv_Bild_146-1985-013-07%2C_Erwin_Rommel.jpg",
    lifespan: {
        birth: 1891,
        death: 1944
    }
}, {
    title: "General",
    name: "George S. Patton",
    bio: "Known for his driven personality, self-promotion, and inspirational leadership, Patton drove his troops on long offensive operations against the Wehrmacht in North Africa, Sicily, and France during the latter years of the war.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Pattonphoto.jpg",
    lifespan: {
        birth: 1885,
        death: 1945
    }
}, {
    title: "Chief of General Staff",
    name: "Georgy Zhukov",
    bio: "One of Stalin's top commanders, Zhukov brought discipline and deep planning to his many roles in the Red Army. He famously destroyed the 6th Army at Stalingrad and, in 1945,  led the final attack against Nazi Germany in the Battle of Berlin.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Zhukov-LIFE-1944-1945.jpg",
    lifespan: {
        birth: 1896,
        death: 1974
    }
}];

var cardHolder = document.getElementById("cardHolder");
var userInput = document.getElementById("userInput")
var cardCounter = 0;
var cardSelected = false;
var selectedElement;

var createPerson = currentPerson => { //prints the array to the DOM, called at bottom of page
    var newPerson = document.createElement("person");
    if (cardCounter % 2 === 0) { //wasn't sure how to implement cardCounter as a private variable
        newPerson.className = "yellow-background card";
    } else {
        newPerson.className = "blue-background card";
    }
    cardCounter++;
    var newTitle = document.createElement("div");
    newTitle.className = "cardTitle";
    newTitle.innerText = currentPerson.title;
    var newName = document.createElement("div");
    newName.className = "cardName";
    newName.innerText = currentPerson.name;
    var newBio = document.createElement("div");
    newBio.className = "cardBio";
    newBio.innerText = currentPerson.bio;
    var newImg = document.createElement("img");
    newImg.className = "cardImg";
    newImg.src = currentPerson.image;
    var newLifespan = document.createElement("div");
    newLifespan.className = "cardLifespan";
    newLifespan.innerText = `${currentPerson.lifespan.birth} - ${currentPerson.lifespan.death}`
    newPerson.appendChild(newName); //A lot of this could be cleaned up with chaining but I like it this way
    newPerson.appendChild(newTitle);
    newPerson.appendChild(newLifespan);
    newPerson.appendChild(newImg);
    newPerson.appendChild(newBio);
    cardHolder.appendChild(newPerson);
    newPerson.addEventListener("click", personClicked)
}

var personClicked = e => {
    if (cardSelected === false) {
        cardSelected = true;
        if (e.target.nodeName === "PERSON") {
            selectedElement = e.target;
        } else {
            selectedElement = e.target.parentElement; //Makes sure I select the card!
        }
        selectedElement.classList.toggle("dottedBorder"); //adds dotted border to person card
        userInput.focus(); //adds focus to input field
        userInput.value = selectedElement.children[4].innerText;
        userInput.addEventListener("keyup", pairBio);
    }
};

function pairBio(e) {
    selectedElement.children[4].innerText = userInput.value;
    if (e.keyCode === 13) {
        selectedElement.children[4].innerText = userInput.value;
        userInput.value = "";
        selectedElement.classList.toggle("dottedBorder");
        userInput.removeEventListener("keyup", pairBio);
        selectedElement = "";
        cardSelected = false;
    }
}

for (i = 0; i < famousPeople.length; i++) {
    createPerson(famousPeople[i]);
};