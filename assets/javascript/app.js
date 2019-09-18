


$(document).ready(function () {//// Variables
    let questions = [
        {
            question: "Which of the following is NOT one of the Hanson Brothers?",
            options: ["Taylor", "Issac", "Jeff", "Zach"],
            answer: 2
        },

        {
            question: "What is the name of the craft beer Hanson created?",
            options: ["Brothers Beer", "MmmHops", "Longhaired IPA", "Middle of Nowhere Beer"],
            answer: 1
        },

        {
            question: "What city did Hanson grow up in?",
            options: ["Detroit, MI", "Tulsa, OK", "Salt Lake City, UT", "Los Angeles, CA"],
            answer: 1
        },
        {
            question: "Hanson only made two albums. ",
            options: ["True", "False"],
            answer: 1
        },

        {
            question: "Hanson left a mainstream record label and started their own label.",

            options: ["True", "False"],
            answer: 0
        },

        {
            question: "Hanson is still touring and creating new music.",
            options: ["True", "False"],
            answer: 0
        },

        {
            question: "What was the name of Hanson's first albumn?",
            options: ["Middle of Nowhere", "Underneath", "Shout it Out", "The Walk"],
            answer: 0

        },
        {
            question: "Hanson leads an initiative called Take The Walk, which raises money and awareness for poverty and AIDS in Africa.",
            options: ["True", "False"],
            answer: 0

        }];



    let showQuestions;
    let questionIndex = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let counter = 16;
    let userGuess = "";
    let betweenTime;
    let unanswered = 0;
    let images = ["./assets/images/hanson.jpg", "./assets/images/hanson1.jpg", "./assets/images/hanson3.jpg", "./assets/images/hansonOld.jpg", "./assets/images/hansonOld2.jpg", "./assets/images/hansonYoung.jpg", "./assets/images/hansonYoung2.jpg", "./assets/images/hansonYoung3.jpg"]
    let mySound;


    //hiding timer from main page//

    $(".timeRemaining").hide();

//function called when the start button is clicked, resets information and hides divs//
    function startQuestions() {
        questionIndex = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        unanswered = 0;
        

        $(".instructions").hide();
        $(".answeredRight").hide();
        $(".answeredWrong").hide();
        $(".unanswered").hide();
        $(".questionDiv").show();
       // $(".timeRemaining").show();
       




        $("#start").hide();

        nextQuestion();
        
    
        console.log("start was clicked");





    }
   //function that displays the questions and answers for the player to select
    function nextQuestion() {


        
        
        $(".images").hide();
        answerStop();
        startTime();
       // $(".timeRemaining").show();
        $(".answerDiv").empty();
        $(".ansOptions").empty();

        //loops through answer options and displays the potentional answers 

        if (questionIndex < 8) {
            let askQuestion = questions[questionIndex].question;

            $(".questionDiv").text(askQuestion);
            console.log(questions[questionIndex].question);

            for (let i = 0; i < questions[questionIndex].options.length; i++) {

                let answerOptions = $("<div>");
                answerOptions.addClass("ansOptions");
                answerOptions.html(questions[questionIndex].options[i]);
                answerOptions.attr("data-guessValue", i);
                $("#optionsDiv").append(answerOptions);
               

                console.log(questions[questionIndex].options[i]);
            }
        }


        else {
            stop();
            $(".timeRemaining").hide();
            $(".questionDiv").hide();
            $(".answeredRight").show();
            $(".answeredWrong").show();
            $(".unanswered").show();
            $(".answeredRight").html("Correct Answers: " + correctAnswers);
            $(".answeredWrong").html("Wrong Answers: " + wrongAnswers);
            $(".unanswered").html("Unanswered: " + unanswered);
            $("#start").show();
            $("#start").on("click", restartQuestions);
           
        }





//on click function to answer questions//

        $(".ansOptions").one("click", userGuessed) 



    };

  
//function to restart game//
    function restartQuestions() {
        stop();
        startQuestions();


    };

    //displays images from array//
    function displayImage() {
        $(".timeRemaining").empty();
        counter = 16;
        $(".images").show();
        $(".timeRemaining").hide();
        
        $(".images").html("<img src= " + images[questionIndex] + " width='400px'>");
    }


//checks to see if the the userguess is right or wrong
    function userGuessed() {

        console.log("clicked");

        userGuess = ($(this).attr("data-guessValue"));
        userGuess = parseInt(userGuess);

        console.log(userGuess);

        


        if  (userGuess === questions[questionIndex].answer) {
            stop();
            correctAnswers++;
            console.log("right");
            $(".answerDiv").html("<p> You are Correct! </p>");
            displayImage();
            timeForAnswer();


        }

        



        else {

            stop();
            wrongAnswers++;
            console.log("wrong");
            $(".answerDiv").html("You are Wrong!" + " The answer is: " + questions[questionIndex].options[questions[questionIndex].answer]);
            displayImage();
            timeForAnswer();




        }
    };




    function startTime() {
        counter = 16;
        $(".timeRemaining").show();

        showQuestions = setInterval(counterDisplay, 1000)


    }

    function stop() {

        clearInterval(showQuestions);

    }

    function timeForAnswer() {
        
        stop();

        questionIndex++;
        betweenTime = setTimeout(nextQuestion, 1000 * 3);
        




    }

    function answerStop() {

        clearTimeout(betweenTime);
    }

    function counterDisplay() {

        counter--;
        $(".timeRemaining").text("Time Remaining: " + counter);


        if (counter === 0) {
            stop();
            $(".answerDiv").html("You ran out of time!" + " The answer is: " + questions[questionIndex].options[questions[questionIndex].answer]);
            displayImage();
            timeForAnswer();
            unanswered++;
            console.log("You ran out of time!");






        }




    };

  

    // window.onload = function(){
    //     document.getElementById("my_audio").play();
    // }

    // function myFunction() {
    //    document.getElementById("myAudio").autoplay;
     
        
    //   }
    //   myFunction();



    // function stopCounterDisplay (){

    //     clearTimeout(showQuestions);
    // }



    //answers - need to get index number of selected answer and compare to correct answer



    $("#start").one("click", startQuestions);








});