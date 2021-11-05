/* START: Define Necessary variables */
let i, j, answersCount = 0, myAttr = null, myStyle = null, questionCount = 1, AnswersCount = 0;
let trueAnswers = [3, 1, 5, 5, 2, 1, 2, 2, 2, 6, 4, 1, 4, 7, 2, 3, 1, 6, 5, 8, 4, 4, 7, 6, 4, 7, 7, 3, 2, 8];   // True Answers
let userChoices = [];  // User Answers
let startTime = null;   // Start Time
let endTime = null;   // End Time
let userTrueAnswers = 0, userFalseAnswers = 0;

/* END: Define Necessary variables */


/* START: Reset Body CSS And Define Font*/
let body = document.querySelector('body');
body.style.margin = '0px';
body.style.padding = '0px';
/* END: Reset Body CSS And Define Font */


/* START: Question Count And Timer Box */
let counterBox = document.createElement('div'); // Counter And Timer Main BOx
setAttributes(counterBox, {
    'style':
        `background: #eee;
         width: 50%;
         margin: 1% auto; 
         display: none; 
         grid-template-columns: 50% 50%;
         text-align: center;
         border: solid 1px #000;
         height: 30px;`,
    'id':
        `counterBox`
});
document.body.appendChild(counterBox);


let questionCountBox = document.createElement('div');   // Counter Box
questionCountBox.textContent = questionCount;
questionCountBox.style.margin = 'auto';
counterBox.appendChild(questionCountBox);


let timerBox = document.createElement('div');   // Counter Box
timerBox.textContent = '01:22';
timerBox.style.margin = 'auto';
counterBox.appendChild(timerBox);
/* End: Question Count And Timer Box */


/* START: Start Button */
let startButton = document.createElement('button');
setAttributes(startButton, {
    'style':
        `background: #00da00;
         width: 12%;
         border: #00da00;
         border-radius: 15px;
         height: 35px;
         font-size: 14pt;
         font-family: IRANSans;
         color: #fff;
         margin: 8% auto 0;
         display: block;`,
    'onclick':
        `startFunction()`,
    'id':
        `startButton`
});
startButton.textContent = 'شروع تست';
body.appendChild(startButton);
/* END: Start Button */


/* START: Print Questions */
for (i = 1; i <= trueAnswers.length; i++) {
    let mainBox = document.createElement('div');    // Questions Main Box
    setAttributes(mainBox, {
        'style':
            `background:#eee; 
             width: 37%; 
             margin: 0 auto 1%;
             display: none;`,
        'id':
            `mainBox_${i}`
    });
    body.appendChild(mainBox);


    let questionBox = document.createElement('div');  // Question Box
    setAttributes(questionBox, {
        'style':
            `margin: 5% auto;
             width: fit-content;
             border: solid 1px #000`
    });
    mainBox.appendChild(questionBox);


    let questionImage = document.createElement('img');  // Question Image
    setAttributes(questionImage, {
        'src':
            `images/${i}/test${i}.png`
    });
    questionBox.appendChild(questionImage);


    let answersBox = document.createElement('div');  // AnswerBox Box
    setAttributes(answersBox, {
        'style':
            `margin: 1% auto;
             width: 84%;`
    });
    mainBox.appendChild(answersBox);


    /* START: Print Answer Images */
    if (i <= 12) {      // Define Count Of Answers
        AnswersCount = 6
    } else {
        AnswersCount = 8
    }


    for (j = 1; j <= AnswersCount; j++) {
        let answersImages = document.createElement('img');  // Question Image
        setAttributes(answersImages, {
            'src':
                `Images/${i}/${i}-${j}.png`,
            'style':
                `margin: 3%;
                 border: solid 1px #000`,
            'onclick':
                `userAnswerFunction(${i}, ${j})`
        });
        answersBox.appendChild(answersImages);
    }
    /* END: Print Answer Images */
}

/* END: Print Questions */


/* START: Function to define multiple Attributes */
function setAttributes(element, attributes) {
    for (myAttr in attributes) {    // Make A Loop In Attribute Object
        element.setAttribute(myAttr, attributes[myAttr]);   // Set Attribute For Chosen Element
    }
}

// to use this function you need to send two parameters for it,
// the first parameter is the element that we want to set Attribute for
// the second parameter should be an Object of attributes
// Syntax : setAttributes(elementName, {'firstAttribute': 'value', 'secondAttribute': 'value', ...})

/* END: Function to define multiple Attributes */


/* START: Start Button Function */
function startFunction(button) {
    document.getElementById(`counterBox`).style.display = 'grid';       // Show Question Number And Timer Box
    document.getElementById('mainBox_1').style.display = 'flow-root';   // Show First Question
    document.getElementById('startButton').style.display = 'none';      // Hide Start Button
    startTime = new Date(); // Save User Starting Time
}

/* END: Start Button Function */


/* START: Function To define What Happen When User Click On Answers */
function userAnswerFunction(question, answer) {
    questionCount = question + 1;   // Increase Question Count
    questionCountBox.textContent = questionCount;    // Print Question Count
    userChoices.push(answer);   // Save User Choices In An Array
    if (question < trueAnswers.length) {    // Display Next Question
        document.getElementById(`mainBox_${question}`).style.display = 'none';  // Hide Previous Question
        document.getElementById(`mainBox_${question + 1}`).style.display = 'flow-root'; // Show Next Question Question
    } else {    // Define What Happen After The Questions End
        endTime = new Date();   // Save User Finishing Time
        document.getElementById(`mainBox_${question}`).style.display = 'none';  // Hide Question
        document.getElementById(`counterBox`).style.display = 'none';   // Hide Question Count And Timer Box
        for (let k = 0; k < trueAnswers.length; k++) {  // Count User True And False Answers
            // Check if the user Choices is Correct Or Not, Count Correct And False Answers
            (userChoices[k] === trueAnswers[k]) ? ++userTrueAnswers : ++userFalseAnswers;
        }
        printResult();  // Calling for Result Printer Function
    }
}

/* END: Function To define What Happen When User Click On Answers */


/* START: Function To Print IQ Test Result */
function printResult() {
    let resultBox = document.createElement('div');  // Result Main Box
    setAttributes(resultBox, {
        'style':
            `margin: auto;
             width: 40%;
             text-align: center;`
    });
    body.appendChild(resultBox);

    let trueAnswersResult = document.createElement('p');    // Print User True Answer
    setAttributes(trueAnswersResult, {
        'style':
            `padding: 2%;
             background: #0f0;
             font-size: 17pt;`
    });
    trueAnswersResult.textContent = `Your true answers = ${userTrueAnswers}`;
    resultBox.appendChild(trueAnswersResult);


    let falseAnswersResult = document.createElement('p');   // Print User False Answer
    setAttributes(falseAnswersResult, {
        'style':
            `padding: 2%;
             background: #f00;
             font-size: 17pt;`
    });
    falseAnswersResult.textContent = `Your false answers = ${userFalseAnswers}`;
    resultBox.appendChild(falseAnswersResult);


    let finishingTime = document.createElement('p');    // Print User Time
    setAttributes(finishingTime, {
        'style':
            `padding: 2%;
             background: #00f;
             font-size: 17pt;`
    });

    let min = (endTime - startTime) / 60000 // Convert Milli Sec To Min
    let sec = (endTime - startTime) / 1000  // Convert Milli Sec To Sec

    min = twoDigitNumber(parseInt(min));    // Put 0 Before Min If It's Less Than 10
    sec = twoDigitNumber(parseInt(sec));    // Put 0 Before Sec If It's Less Than 10

    finishingTime.textContent = `Your time = ${min} : ${sec}`;
    resultBox.appendChild(finishingTime);

}

/* END: Function To Print IQ Test Result */


/* START: If A Number Is One Digit Put 0 Before It */
function twoDigitNumber(number) {
    return (number < 10) ? number = `0${number}` : number;
}

/* END: If A Number Is One Digit Put 0 Before It */
