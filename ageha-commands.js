$.fn.agehaUserCommands = function(settings, container) {
    return {
        '' : {
            action: function() {
            }
        },
        cat : {
            action: function(filename) {
                if(filename[0] === '' || typeof filename[0] === 'undefined') {
                    return 'No file given!';
                }
                return 'Output from ' + filename[0] + ': Nothing lul just a test';
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
                console.log(this);
                let helpstring = 'Available Commands:<br><br>';

                helpstring += 'cat<br>';
                helpstring += 'hostname<br>';
                helpstring += 'pwd<br>';
                helpstring += 'whoami<br>';
                helpstring += 'clear<br>';
                helpstring += 'ssh<br>';
                helpstring += 'help<br>';

                return helpstring;
            }
        }
    };
}