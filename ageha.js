"use strict";

$.fn.agehaInit = function(options) {
    //setting the defaultvalues
    var defaults = {
        'user': {
            name: 'root',
            color: 'f44242'
        },
        'host': {
            name: 'ageha',
            color: '028815'
        },
        'startDir': {
            name: '/var/www/html',
            color: 'ffffff'
        }
    };

    var validCommands = {
        cat : {
            response: function() {
                return 'test'
            }
        },
        hostname: {
            response: function() {
                return settings.host.name
            }
        },
        pwd: {
            response: function() {
                return settings.startDir.name
            }
        },
        whoami: {
            response: function() {
                return settings.user.name
            }
        },
        clear: {
            response: function() {
                $('#console-window').html('');
                return '';
            }
        }
    };

    //merge the defaults with the options given by the user
    var settings = $.extend({}, defaults, options || {});


    //Always focus the user input field
    $("#console-window").click(function() {
        $("#console-input").focus();
    });

    $("body").on("keypress", "#console-input", function(e) {
        if (e.keyCode === 13) {
            parseInput();
            generateNewLine();
            $("#console-input").focus();
        }
    });

    function generatePrompt() {
        return '<p class="console-line">' +
            '<span style="color: #' + settings.user.color + '">' + settings.user.name + '</span>' +
            '@' +
            '<span style="color: #' + settings.host.color + '">' + settings.host.name + '</span>' +
            ': ' +
            '<span style="color: #' + settings.startDir.color + '">' + settings.startDir.name + '</span>' +
            ' ' +
            '<input type=text id="console-input"></p>';
    }

    function generateNewLine() {
        transformInput();
        $("#console-window").append(generatePrompt());
    }

    function generateOutput(output) {
        $("#console-window").append("<p class=\"console-line\">" + output + "</p>");
    }

    function transformInput() {
        let inputValue = $("#console-input").val();
        $("#console-input").replaceWith("<span class='console-input-used'>" + inputValue + "</span>");
    }

    function parseInput() {
        let inputValue = $("#console-input").val();
        inputValue = inputValue.split(" ");

        checkIfValidCommand(inputValue[0]);
    }

    function checkIfValidCommand(command) {
        let commandObject;
        if(typeof (commandObject = validCommands[command]) === 'undefined') {
            generateOutput("bash: " + command + ": command not found")
        } else {
            generateOutput(commandObject.response())
        }
    }

    //init
    (function () {
        generateNewLine();
        $("#console-input").focus();
    })();
};