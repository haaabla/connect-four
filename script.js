$(document).ready(function() {

    var victories = [
            [ 0, 8, 16, 24 ],
            [ 1, 9, 17, 25 ],
            [ 2, 10, 18, 26 ],
            [ 3, 9, 15, 21 ],
            [ 3, 11, 19, 27 ],
            [ 4, 10, 16, 22 ],
            [ 5, 11, 17, 23 ],
            [ 6, 12, 18, 24 ],
            [ 7, 15, 23, 31 ],
            [ 8, 16, 24, 32 ],
            [ 9, 17, 25, 33 ],
            [ 10, 16, 22, 28 ],
            [ 10, 18, 26, 34 ],
            [ 11, 17, 23, 29 ],
            [ 12, 18, 24, 30 ],
            [ 13, 19, 25, 31 ],
            [ 14, 22, 30, 38 ],
            [ 15, 23, 31, 39 ],
            [ 16, 24, 32, 40 ],
            [ 17, 23, 29, 35 ],
            [ 17, 25, 33, 41 ],
            [ 18, 24, 30, 36 ],
            [ 19, 25, 31, 37 ],
            [ 20, 26, 32, 38 ]
    ];

var curPlayer = 'red';

var colUps = [ 6, 6, 6, 6, 6, 6, 6 ];
var colReds = [ 0, 0, 0, 0, 0, 0, 0 ];
var colYellows = [ 0, 0, 0, 0, 0, 0, 0 ];

var curPlayerArray;
var redChips = [];
var yellowChips = [];

function switchPlayer () {
    if (curPlayer == 'red') {
        curPlayer = 'yellow';
    } else {
        curPlayer = 'red';
    }
}

$('.victory').on('click', function (e){
    $('.victory').fadeOut(2000);
    $('.startscreen').fadeIn();
    setTimeout(function(){
        location.reload();
    }, 2000);
});

$('.victory').hide();

$('.start').on('click', function(e){
    $('.startscreen').fadeOut(800);
    $('.slot').removeClass('logo4');
    $('.pick-container').fadeOut();
});

$('.columns').on('click.onOff', function(e){
    var col = $(e.currentTarget);
    var index = col.index(); //gives you col index within it's parent

    //COLUMN PLACEMENT & ADDING CLASSES
    if (curPlayer == 'red') {
        col.find('.slot.row' + colUps[index]).addClass(curPlayer);
        $("." + curPlayer + '-pile').find('.chip.'+curPlayer).first().remove();
        colUps[index] = colUps[index] - 1;
        colReds[index] = colReds[index] + 1;
        colYellows[index] = 0;
    } else {
        col.find('.slot.row' + colUps[index]).addClass(curPlayer);
        $("." + curPlayer + '-pile').find('.chip.' + curPlayer).first().remove();
        colUps[index] = colUps[index] - 1;
        colReds[index] = 0;
        colYellows[index] = colYellows[index] + 1;
    }

    //CHECK COLUMN
    function checkColumn() {
        if (colYellows[index] == 4 || colReds[index] == 4) {
            $('.victory').fadeIn(1500).show();
            $('<h3>' + curPlayer + '</h3>' + '<h4>WINS</h4>').appendTo('.victory-chip');
            if (curPlayer == 'red') {
                $('.victory-chip').css({backgroundColor: '#C44F4F'});
            } else {
                counter = 0;
                $('.victory-chip').css({backgroundColor: '#FFEE58'});
            }
            $('.columns').off('.onOff');
        }
    }

    //CHECK ROWS
    function checkRows() {
        var currentRow = colUps[index];
        var rows = $('.row' + (currentRow+1));

        var counter = 0;

        for (var i = 0; i < rows.length; i++) {
            if (rows.eq(i).hasClass(curPlayer)) {
                counter++;
            } else {
                counter = 0;
            }

            if (counter >= 4) {
                $('.victory').fadeIn(1500).show();
                $('<h3>' + curPlayer + '</h3>' + '<h4>WINS</h4>').appendTo('.victory-chip');
                if (curPlayer == 'red') {
                    $('.victory-chip').css({backgroundColor: '#C44F4F'});
                } else {
                    $('.victory-chip').css({backgroundColor: '#FFEE58'});
                }
                $('.columns').off('.onOff');
            }
        }
    }

    //CHECK DIAGONALLY
    function checkDiagonal() {

        redChips = [];

        for (var i = 0; i < 42; i++) {
            if ( $( 'div#' + i ).hasClass('red') ) {
                redChips.push( i );
            } else if ( $( 'div#' + i ).hasClass('yellow') ) {
                yellowChips.push( i );
            }
        }

        var redCounter = 0;
        var yellowCounter = 0;
        for (var i = 0; i < victories.length; i++) {
            for (var j = 0; j < 4; j++) {
                if ( redChips.includes(victories[i][j]) ) {
                    redCounter++;
                }
                if ( yellowChips.includes(victories[i][j]) ) {
                    yellowCounter++;
                }
            }
            if (redCounter == 4 || yellowCounter == 4) {
                $('.victory').fadeIn(1500).show();
                $('<h3>' + curPlayer + '</h3>' + '<h4>WINS</h4>').appendTo('.victory-chip');
                if (curPlayer == 'red') {
                    $('.victory-chip').css({backgroundColor: '#C44F4F'});
                } else {
                    $('.victory-chip').css({backgroundColor: '#FFEE58'});
                }
                $('.columns').off('.onOff');
            }
            redCounter = 0;
            yellowCounter = 0;
        }

    }

    //CHECK FOR VICOTRY
    checkColumn();
    checkRows();
    checkDiagonal();
    //SWITCHES PLAYER
    switchPlayer();
});

});
