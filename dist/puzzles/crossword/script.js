// Global variable to store the data
var data;
const dataPath = '../../../assets/puzzle_configs/crossword_data.json';
const mainRoomPath = "../../rooms/main-room/index.html";

document.addEventListener("DOMContentLoaded", async function () {
    fetch(dataPath)
    .then(response => response.json())
    .then(jsonData => {
        // Store the data in the global variable
        data = jsonData;


        // Call initializeScreen function after data is fetched
        initializeScreen();
    })
    .catch(error => console.error('Error:', error));
});


//Globals
var currentTextInput;
var puzzleArrayData;
//Loads the Crossword
function initializeScreen(){
    var puzzleTable = document.getElementById("puzzle");
    puzzleArrayData = preparePuzzleArray();
    for ( var i = 0; i < puzzleArrayData.length ; i++ ) {
        var row = puzzleTable.insertRow(-1);
        var rowData = puzzleArrayData[i];
        for(var j = 0 ; j < rowData.length ; j++){
            var cell = row.insertCell(-1);
            if(rowData[j] != 0){
                var txtID = String(`txt_${i}_${j}`);
                cell.innerHTML = `<input type="text" class="inputBox" maxlength="1" style="text-transform: lowercase" id="${txtID}" onfocus="textInputFocus('${txtID}')">`;
            }else{
                cell.style.backgroundColor  = "black";
            }
        }
    }
    addHint();
    displayHints(data);
}
// Display the hints
function displayHints(data) {
    // Start the HTML for the hints
    var html = '<tr><td><strong>Horizontal:</strong></td><td><strong>Vertical:</strong></td></tr>';

    // Add the across clues
    for (var key in data.across) {
        var word = data.across[key];
        html += '<tr><td>' + key + '. ' + word.clue + '</td>';

        // If there's a down clue with the same number, add it to the same row
        if (data.down[key]) {
            var word = data.down[key];
            html += '<td>' + key + '. ' + word.clue + '</td></tr>';
        } else {
            html += '<td></td></tr>';
        }
    }

    // Add the remaining down clues
    for (var key in data.down) {
        if (!data.across[key]) {
            var word = data.down[key];
            html += '<tr><td></td><td>' + key + '. ' + word.clue + '</td></tr>';
        }
    }

    // Set the HTML of the hintsTable
    document.getElementById('hintsTable').innerHTML = html;
}
//Adds the hint numbers
function addHint() {
    // Iterate over the 'across' words
    for (var key in data.across) {
        var word = data.across[key];
        var id = "txt_" + word.row + "_" + (word.col - 1);
        document.getElementById(id).placeholder = key;
    }

    // Iterate over the 'down' words
    for (var key in data.down) {
        var word = data.down[key];
        var id = "txt_" + word.row + "_" + (word.col - 1);
        document.getElementById(id).placeholder = key;
    }
}
//Stores ID of the selected cell into currentTextInput
function textInputFocus(txtID123){
    currentTextInput = txtID123;
}
//Returns Array
function preparePuzzleArray() {
    // Find the size of the grid and the minimum column index
    var maxRow = 0;
    var maxCol = 0;
    var minCol = Infinity;
    for (var key in data.across) {
        var word = data.across[key];
        maxRow = Math.max(maxRow, word.row);
        maxCol = Math.max(maxCol, word.col + word.answer.length - 1);
        minCol = Math.min(minCol, word.col);
    }
    for (var key in data.down) {
        var word = data.down[key];
        maxRow = Math.max(maxRow, word.row + word.answer.length - 1);
        maxCol = Math.max(maxCol, word.col);
        minCol = Math.min(minCol, word.col);
    }

    // Create the grid
    var items = [];
    for (var i = 0; i <= maxRow; i++) {
        items[i] = [];
        for (var j = 0; j <= maxCol; j++) {
            items[i][j] = 0;
        }
    }

    // Add the words to the grid
    for (var key in data.across) {
        var word = data.across[key];
        for (var i = 0; i < word.answer.length; i++) {
            items[word.row][word.col + i - minCol] = word.answer[i];
        }
    }
    for (var key in data.down) {
        var word = data.down[key];
        for (var i = 0; i < word.answer.length; i++) {
            items[word.row + i][word.col - minCol] = word.answer[i];
        }
    }

    return items;
}
//Clear All Button
function clearAllClicked(){
    currentTextInput = '';
    var puzzleTable = document.getElementById("puzzle");
    puzzleTable.innerHTML = '';
    initializeScreen();
}
//Check button
function checkClicked(){
    var matchCount = 0;
    var totalWords = 0;

    for ( var i = 0; i < puzzleArrayData.length ; i++ ) {
        var rowData = puzzleArrayData[i];
        for(var j = 0 ; j < rowData.length ; j++){
            if(rowData[j] != 0){
                totalWords++;
                var selectedInputTextElement = document.getElementById('txt' + '_' + i + '_' + j);
                if(selectedInputTextElement.value.trim().toLowerCase() == puzzleArrayData[i][j].toLowerCase()){
                    selectedInputTextElement.style.backgroundColor = 'green';
                    matchCount++;
                } else {
                    selectedInputTextElement.style.backgroundColor = 'red';
                }
            }
        }
    }

    // If all words match, redirect to another page
    if (matchCount == totalWords) {
        window.location.href = mainRoomPath;
    }
}
//Clue Button
// Initialize the number of clues
var totalClues = 5;
var usedClues = 0;

// Update the button text with the number of remaining clues
function updateClueButton() {
    var remainingClues = totalClues - usedClues;
    var clueButton = document.getElementById("clueButton");
    // Change the value of the "Clue" button
    clueButton.value = "Clue(" + remainingClues + ")";
}

function clueClicked(){
    if (currentTextInput != null){
        var temp1 = currentTextInput;
        var token = temp1.split("_");
        var row = token[1];
        var column = token[2];
        var selectedInput = document.getElementById(temp1);
        
        // Check if the selected square has a placeholder
        if (selectedInput.placeholder == "") {
            if (usedClues < totalClues) {
                selectedInput.value = puzzleArrayData[row][column];
                usedClues++;
                updateClueButton();
            } else {
                alert("No more clues left!");
            }
        } else {
            alert("You cannot use a clue on this square!");
        }
    }
}

// Solve Button
function solveClicked(){
    if (currentTextInput != null){
        var temp1 = currentTextInput;
        var token = temp1.split("_");
        var row = token[1];
        var column = token[2];
        
        // Print elements on top
        for(j = row; j >= 0; j--){
            if(puzzleArrayData[j][column] != 0){
                document.getElementById('txt' + '_' + j + '_' + column).value = puzzleArrayData[j][column];
                }else break;
        }
        // Print elements on right
        for(i = column; i< puzzleArrayData[row].length; i++){
            if(puzzleArrayData[row][i] != 0){
                document.getElementById('txt' + '_' + row + '_' + i).value = puzzleArrayData[row][i];
                }else break;
        }
        
        // Print elements below
        for(m = row; m< puzzleArrayData.length; m++){
            if(puzzleArrayData[m][column] != 0){
                document.getElementById('txt' + '_' + m + '_' + column).value = puzzleArrayData[m][column];
                }else break;
        }
        // Print elements on left
        for(k = column; k >= 0; k--){
            if(puzzleArrayData[row][k] != 0){
                document.getElementById('txt' + '_' + row + '_' + k).value = puzzleArrayData[row][k];
                }else break;
        }
        // Done!
        
    }
}
