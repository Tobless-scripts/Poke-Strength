// Select all elements with the id "sound" (sound icons)
const soundIcons = document.querySelectorAll("#sound");

// Select the background music audio element
const audio = document.getElementById("backgroundMusic");

// Loop through each sound icon and attach event listeners
soundIcons.forEach((soundIcon) => {
    try {
        // Set the initial icon state based on whether the audio is playing or paused
        if (!audio.paused) {
            soundIcon.src = "/media/soundIcon.png"; // Set sound icon when audio is playing
        }

        // Add a click event listener to toggle audio playback
        soundIcon.addEventListener("click", () => {
            if (audio.paused) {
                audio.play(); // Play audio
                soundIcon.src = "/media/soundIcon.png"; // Change icon to playing state
            } else {
                audio.pause(); // Pause audio
                soundIcon.src = "/media/pause.png"; // Change icon to paused state
            }
        });
    } catch (e) {
        // Log and alert if an error occurs
        console.log("Couldn't toggle audio for this icon. Error:", e);
        alert(
            "Audio functionality is currently unavailable for one of the icons."
        );
    }
});

// Function to fetch Pokémon data based on user input
fetchData();
async function fetchData() {
    try {
        // Get the Pokémon name entered by the user and convert it to lowercase
        const pokemonName = document
            .getElementById("pokemonName")
            .value.toLowerCase();

        // Fetch Pokémon data using the PokeAPI
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        // Check if the Pokémon exists
        if (!response.ok) {
            alert("Player is not a Pokémon"); // Alert if the Pokémon is invalid
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default; // Get the Pokémon's sprite

        // Update all elements with the class "pokemonSprite"
        const imgElement = document.querySelectorAll(".pokemonSprite");
        imgElement.forEach((img) => {
            img.src = pokemonSprite; // Set the image source
            img.style.display = "block"; // Make the image visible
        });

        // Update all elements with the class "name" with the Pokémon name
        const imgName = document.querySelectorAll(".name");
        imgName.forEach((name) => {
            name.textContent = data.name;
        });

        // Calculate the total base stats of the Pokémon
        const stats = data.stats.map((stat) => stat.base_stat);
        let totalBaseStats = stats.reduce((sum, stat) => {
            return sum + stat;
        });

        // Update all elements with the class "stat" with the total base stats
        const imgStats = document.querySelectorAll(".stat");
        imgStats.forEach((stat) => {
            stat.textContent = totalBaseStats;
        });
    } catch (e) {
        // Log any errors
        console.error(e);
    }
    pokemonName.value = ""; // Clear the input field
}

// Function to fetch a random Pokémon from the PokeAPI
async function getRandomPokemon() {
    try {
        // Generate a random ID between 1 and 1010 (valid Pokémon range)
        const randomId = Math.floor(Math.random() * 1010) + 1;

        // Fetch Pokémon data by random ID
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        const pokemon = await response.json();

        // Update all elements with the class "computerName" with the Pokémon name
        const pokemonNameElement = document.querySelectorAll(".computerName");
        pokemonNameElement.forEach((name) => {
            name.textContent = pokemon.name;
        });

        // Calculate the total base stats of the random Pokémon
        const stats2 = pokemon.stats.map((stat) => stat.base_stat);
        let totalBaseStats2 = stats2.reduce((sum, stat) => {
            return sum + stat;
        });

        // Update all elements with the class "computerStat" with the total base stats
        const pokemonStatElement = document.querySelectorAll(".computerStat");
        pokemonStatElement.forEach((stat) => {
            stat.textContent = totalBaseStats2;
        });

        // Update all elements with the class "computerSprite" with the Pokémon sprite
        const pokemonSpriteElement =
            document.querySelectorAll(".computerSprite");
        pokemonSpriteElement.forEach((img) => {
            img.src = pokemon.sprites.front_default;
            img.style.display = "block"; // Make the sprite visible
        });
    } catch (error) {
        // Log any errors
        console.error("Error fetching Pokémon:", error);
    }
}

const centerDiv = document.getElementById("centerDiv");
const vsButton = document.querySelector(".vs2");
let button;
let countdownStarted = false; // Ensure the countdown runs only once

// Function to start the countdown
function startCountdown() {
    if (countdownStarted) return; // Prevent multiple countdowns
    countdownStarted = true;

    let countdown = 5; // Starting countdown value

    const countdownInterval = setInterval(() => {
        if (countdown > 0) {
            centerDiv.textContent = countdown; // Update countdown text
            countdown--;
        } else {
            clearInterval(countdownInterval); // Stop the countdown
            centerDiv.textContent = "Fight!"; // Show "Fight"

            // Clear the text after 5 seconds
            setTimeout(() => {
                centerDiv.textContent = ""; // Clear the content

                // Show the "Game over" message and button after 5 seconds
                setTimeout(() => {
                    const field = document.querySelector(".battleField"); // Corrected to use a class selector

                    // Create a new div for the message
                    const message = document.createElement("div");
                    message.classList.add("message");

                    // Create and append the text
                    const text = document.createElement("h2");
                    text.textContent = "Game over";

                    // Create and append the button
                    button = document.createElement("button");
                    button.textContent = "View Results";
                    button.classList.add("resultButton");
                    button.id = "resultButton";

                    // Append text and button to the message
                    message.appendChild(text);
                    message.appendChild(button);

                    // Append the message to the battleField
                    field.appendChild(message);

                    // Now, add event listener to the button after it's created
                    button.addEventListener("click", () => {
                        showSection(resultDiv); // Show the result section
                        const playerOneResults =
                            document.querySelector(".stat");
                        const computerResults =
                            document.querySelector(".computerStat");

                        // Convert innerHTML to numbers for proper comparison
                        const playerOneScore = parseInt(
                            playerOneResults.innerHTML
                        );
                        const computerScore = parseInt(
                            computerResults.innerHTML
                        );
                        const score = document.querySelector(".reveal");

                        if (playerOneScore > computerScore) {
                            score.textContent =
                                "Congratulations, you win! 😁🥳";
                        } else if (playerOneScore < computerScore) {
                            score.textContent =
                                "You lose, the computer wins. 😔😔";
                        } else {
                            score.textContent = "Oops, it's a draw!";
                        }
                    });
                }, 5000); // Delay the display of message by 5 seconds
            }, 1000); // Keep "Fight!" displayed for 1 second
        }
    }, 1000); // Update every second
}

// Add event listener to the button to start the countdown
vsButton.addEventListener("click", startCountdown);

// Trigger the countdown and transition to the battleField
vsButton.addEventListener("click", () => {
    if (!countdownStarted) {
        countdownStarted = true; // Prevent multiple countdowns

        startCountdown(); // Start the countdown
    }
    audio.src = "/gamePlay.mp3";
});

// Call the function to fetch a random Pokémon when the page loads
getRandomPokemon();

// Handle game intro, single-player, and game arena visibility
const gameIntro = document.querySelector(".gameIntro");
const singlePlayer = document.querySelector(".singlePlayer");
const gameArena = document.querySelector(".gameArena");
const battleField = document.querySelector(".battleField");
const resultDiv = document.querySelector(".results");

const singlePlayerButton = document.querySelector(".singlePlay");
const prevButtons = document.querySelectorAll(".prev");
const arenaButton = document.querySelector(".selectCharacter");
const battleButton = document.querySelector(".vs2");
const replayButton = document.getElementById("btn");

const sections = [gameIntro, singlePlayer, gameArena, battleField, resultDiv];

// Function to switch visibility between sections
const showSection = (sectionToShow) => {
    sections.forEach((section) => {
        if (section === sectionToShow) {
            section.classList.add("visible");
            section.classList.remove("inVisible");
        } else {
            section.classList.add("inVisible");
            section.classList.remove("visible");
        }
    });
};

// On page load, show the game intro
window.onload = () => showSection(gameIntro);

// Event listeners to switch sections
singlePlayerButton.addEventListener("click", () => showSection(singlePlayer));
arenaButton.addEventListener("click", () => {
    const inputCheck = document.getElementById("pokemonSprite");

    if (inputCheck.src === "" || inputCheck.src.endsWith("placeholder.png")) {
        alert("Please choose a player");
    } else {
        showSection(gameArena); // Show the single player section
    }
});

battleButton.addEventListener("click", () => showSection(battleField));
// When the replay button is clicked
replayButton.addEventListener("click", () => {
    // Store the state in sessionStorage before reload
    sessionStorage.setItem("showSinglePlayer", "true");

    // Reload the page
    location.reload();
});

// On page load, check the sessionStorage and show the correct section
window.onload = () => {
    // Check if the 'showSinglePlayer' item exists in sessionStorage
    if (sessionStorage.getItem("showSinglePlayer") === "true") {
        showSection(singlePlayer); // Show the singlePlayer section
        sessionStorage.removeItem("showSinglePlayer"); // Remove it after use
    } else {
        showSection(gameIntro); // Default to gameIntro or other logic
    }
};

// Return to the game intro when a "prev" button is clicked
prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
        showSection(gameIntro);
        // Example of additional logic
        const audio = document.querySelector("#audio"); // Ensure this element exists
        if (audio) {
            audio.src = "/gameIntro.mp3";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const homeButton = document.getElementById("btn2");
    if (homeButton) {
        homeButton.addEventListener("click", () => {
            location.reload();
        });
    } else {
        console.error("Home button not found.");
    }
});
