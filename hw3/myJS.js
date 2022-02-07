/*
* Excercise 1
*
*/
const colorBlock = document.querySelector('#color-block');
colorBlock.addEventListener('click', changeColor);


/*
* Then write a function that changes the text and the color inside the div
*
*/

function changeColor(){
    //Write a condition determine what color it should be changed to
    if (colorBlock.style.backgroundColor === '#008000' || colorBlock.style.backgroundColor === 'rgb(0, 128, 0)' || colorBlock.style.backgroundColor === 'green') {
        //change the background color using JS
        colorBlock.style.backgroundColor = '#F08080';
        //Change the text of the color using the span id color-name
        document.querySelector('#color-name').textContent = '#F08080';
    }
    else {
        //change the background color using JS
        colorBlock.style.backgroundColor = '#008000';
        //Change the text of the color using the span id color-name
        document.querySelector('#color-name').textContent = '#008000';
    }
}


/*
* For excercise 2, you need to write an event handler for the button id "convertbtn"
* on mouse click. For best practice use addEventListener.
*
*/
const convertBtn = document.querySelector('#convertbtn');
convertBtn.addEventListener('click', convertTemp);

/*
* Then write a function that calculates Fahrenheit to Celsius and display it on the webpage
*
*/

function convertTemp(){
    //Calculate the temperature here
    const fah = document.querySelector('#f-input').value;
    //Send the calculated temperature to HTML
    document.querySelector('#c-output').textContent = (fah - 32) * 5 / 9;
}


