"use strict";

$.fn.agehaInit = function(options) {
    var container = $('#ageha_console-window');
    var inputfield = $('#ageha_console-input');

    //setting the defaultvalues
    var defaults = {
        'user': {
            name: 'root@',
            color: 'f44242'
        },
        'host': {
            name: 'ageha',
            color: '028815'
        },
        'startDir': {
            name: ': /var/www/html ',
            color: 'ffffff'
        }
    };

    //@TODO: Move this to seperate file?
    var validCommands = {
        '' : {
            action: function() {
            }
        },
        cat : {
            action: function(filename) {
                return 'Output from ' + filename + ': Nothing lul just a test';
            }
        },
        hostname: {
            action: function() {
                return settings.host.name
            }
        },
        pwd: {
            action: function() {
                return settings.startDir.name
            }
        },
        whoami: {
            action: function() {
                return settings.user.name
            }
        },
        clear: {
            action: function() {
                container.html('');
            }
        },
        ssh: {
            action: function() {
                settings.user.name = 'admin@';
                settings.host.name = 'localhost';
            },
        },
        help: {
            action: function() {
                let helpstring = 'Available Commands:<br>';

                $.each(validCommands, function(i, v) {
                   helpstring += i + '<br>';
                });

                return helpstring;
            }
        }
    };

    //merge the defaults with the options given by the user
    var settings = $.extend({}, defaults, options || {});

    //Always focus the user input field
    container.click(function() {
        inputfield.focus();
    });

    //Enterevent
    $("body").on("keypress", inputfield, function(e) {
        if (e.keyCode === 13) {
            parseInput();
            generateNewLine();
            inputfield.focus();
        }
    });

    //Generates the prompt
    function generatePrompt() {
        let prompt;
        prompt = '<p class="ageha_console-line">';

        $.each(settings, function(i, v) {
            prompt += '<span style="color: #' + v.color + '">' + v.name + '</span>';
        });

        return prompt += '<input type=text id="ageha_console-input"></p>';
    }

    //creates a new line
    function generateNewLine() {
        transformInput();
        container.append(generatePrompt());
        //reinit the inputfield because the actual field changes
        inputfield = $("#ageha_console-input");
    }

    function generateOutput(output) {
        if(typeof output === 'undefined') {
            output = '';
        }
        container.append('<p class="ageha_console-line">' + output + "</p>");
    }

    //transforms the inputfield into another class so the ID of the inputfield stays unique
    function transformInput() {
        let inputValue = inputfield.val();
        inputfield.replaceWith("<span class='ageha_console-input-used'>" + inputValue + "</span>");
    }

    //fetches the input, splits it and sends it to processing
    function parseInput() {
        let inputValues = inputfield.val();
        inputValues = inputValues.split(" ");

        processCommand(inputValues);
    }

    //main logic
    function processCommand(inputValues) {
        let command = inputValues[0];
        let commandObject;
        //Throw out the first element since it's the command and we don't need it any longer
        inputValues.shift();

        if(typeof (commandObject = validCommands[command]) === 'undefined') {
            generateOutput("bash: " + command + ": command not found")
        } else {
            generateOutput(commandObject.action(inputValues))
        }
    }

    //initfunction
    (function () {
        generateNewLine();

        inputfield.focus();
    })();
};