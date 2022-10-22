$(document).ready(function () {
    let selectedColor = ''
    let allBtns = ''
    let myCheck = 0;
    let count = 0;
    let isSelected = false;
    let gradeArray = []
    let colorAr = []
    var x = "";
    var i = -1;
    let random_Num = randomColor();
    console.log(random_Num)
    let colArray= [...random_Num];
    console.log(colArray)
    $('.win').hide();
    $('.lose').hide();

    $('.color').on({
        click: function () {
            isSelected = true
            allBtns = $('.color')
            selectedColor = $(this).css('background-color')
            $(this).addClass("border-active")
            allBtns.not(this).removeClass("border-active")
        }
    })

    let guessArray = []
    let rowArray = $('.row-pattern')
    for (let i = 0; i < 10; i++) {
        guessArray = rowArray[i].getElementsByClassName("btn");
        for (let j = 0; j < 4; j++) {
            $(guessArray[j]).attr('id', `g-${i}-${j}`);
        }
    }

    let hintArray = []
    let hintArr = $('.hint')
    for (let i = 0; i < 10; i++) {
        hintArray = hintArr[i].getElementsByClassName("btn-hint");
        for (let j = 0; j < 4; j++) {
            $(hintArray[j]).attr('id', `h-${i}-${j}`);
        }
    }
    console.log(hintArray)

    //SUBMIT BUTTON

    $("#g0,#g1,#g2,#g3,#g4,#g5,#g6,#g7,#g8,#g9").hide();
    $('.check-submit').click(function () {
        colorAr = colorArray()
        console.log(colorAr)
        gradeArray = getGrade();
        console.log(gradeArray)

        showHint();
        myCheck++;
        gameWin();

        lose();
        $('.row-active').removeClass('row-active')
        $('.hint-active').removeClass('hint-active')

        console.log(myCheck);
        for (let i = 0; i < 4; i++) {
            $(`#g-${myCheck}-${i}`).addClass('row-active')
        }
        for (let i = 0; i < 4; i++) {
            $(`#h-${myCheck}-${i}`).addClass('hint-active')
        }
        if ($(this).hasClass('check-active1')) {
            $('.check-active1').attr("disabled", true)
            $('.check-active1').css('color', 'green')
            
        }
    })

    let submitArray = []
    for (let i = 0; i < 10; i++) {
        submitArray = document.getElementsByClassName("check-submit")
        $(submitArray[i]).attr('id', `g-${i}`);
    }

    //Button-Rows

    $('.btn').click(function () {
        console.log(selectedColor);
        if (isSelected === true) {
            console.log(isSelected);
            if ($(this).hasClass('row-active')) {
                let number = parseInt($(this).css('border'));
                console.log(number);
                if (number === 1) { 
                    $(this).css('background-color', selectedColor)
                    $(this).css('border', '0px solid orange');
                    count++;
                    console.log(count);
                    if (count === 4) {
                        if (i <= submitArray.length) {
                            x = + submitArray[i++];
                            $(`#g-${i}`).show();
                            $(`#g-${i}`).css('color', 'orange').css('background', 'transparent')
                            $(`#g-${i}`).addClass('check-active1')
                        }
                        count = 0;
                    }
                }
                else {
                    $(this).css('border', '1px solid white');
                    $(this).css('background', 'none')
                    count--;

                }
            }
        }
    })

    $('.btn-win').click(function () {
        location.reload();
    })

    function makeColorANumber(selectedColor) {
        if (selectedColor === 'rgb(0, 0, 255)') return 0;
        if (selectedColor === 'rgb(0, 128, 0)') return 1;
        if (selectedColor === 'rgb(255, 165, 0)') return 2;
        if (selectedColor === 'rgb(255, 255, 0)') return 3;
        if (selectedColor === 'rgb(0, 0, 0)') return 4;
        if (selectedColor === 'rgb(255, 192, 203)') return 5;
    }

    function randomColor() {
        var colors = ['#ffa500', '#0000ff', '#008000', '#ffff00', '#808080', '#ffc0cb'];
        let random_Array = [];
        for (let i = 0; i < 4; i++) {
            random_Array.push(Math.floor(Math.random() * colors.length));
        }
        console.log(random_Array)
        return random_Array
    }
    let col_To_Number = colArray.map(makeNumAcolor);
    console.log(col_To_Number)
    function makeNumAcolor(colArray) {
        if (colArray=== 0) return '#0000ff';
        if (colArray=== 1) return '#008000';
        if (colArray=== 2) return '#ffa500';
        if (colArray=== 3) return '#ffff00';
        if (colArray=== 4) return '#808080';
        if (colArray=== 5) return '#ffc0cb';
    }


    for (let i = 0; i < 4; i++) {
        $(`#s-${i}`).css('background-color', col_To_Number[i]);
    }



    function getGrade() {
        let random_Array = [];
        let grade_Array = [];
        for (let i = 0; i < 4; i++) {
            random_Array.push(random_Num[i]);
        }
        // Black Hint
        for (let i = 0; i < 4; i++) {
            if (colorAr[i] === random_Array[i]) {
                grade_Array.push('match');
                random_Array[i] = -1;

            }
        }
        // White Hint
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (colorAr[i] === random_Array[j]) {
                    grade_Array.push('white');
                    random_Array[j] = -1;

                }
            }

        }
        console.log(grade_Array);
        return grade_Array;
    }

    function colorArray() {
        let colorAar = []
        for (let j = 0; j < 4; j++) {
            if ($('.btn').hasClass('row-active')) {
                colorAar.push(makeColorANumber($(`#g-${myCheck}-${j}`).css('background-color')))
            }

        }
        return colorAar;
    }

    function showHint() {

        for (let i = 0; i < gradeArray.length; i++) {
            if (gradeArray[i] === "match") {
                $(`#h-${myCheck}-${i}`).css('background', 'none').css('background-color', 'black')
            }
            else if (gradeArray[i] === "white") {
                $(`#h-${myCheck}-${i}`).css('background', 'none').css('background-color', 'gray')
            }
        }

    }
    function gameWin() {
        let rey = gradeArray.join();
        console.log(rey)
        if (rey === "match,match,match,match") {
            console.log("YOU WON")

            $('.sec-cover').hide();
            $('.win').show();
            $('.btn').attr('disabled', true);

        }

    }

    function lose() {
        let rey = gradeArray.join();
        console.log(rey)
        if (rey !== "match,match,match,match" && myCheck === 10) {
            console.log("YOU Loss the Game")

            $('.sec-cover').hide();
            $('.lose').show();
            $('.btn').attr('disabled', true);

        }

    }
})