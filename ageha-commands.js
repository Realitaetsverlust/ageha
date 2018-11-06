$.fn.agehaUserCommands = function() {
    return {
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
}