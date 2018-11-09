Ageha
==========

### A jQuery library to make any element look like a console window

Ageha ist a lightweight, but shitty written library. Why? I have no idea how JS works. You'll see that in a bit.

Include Ageha like this ...

```
<script type="text/javascript" src="/path/to/your/jquery.js"></script>
<script type="text/javascript" src="/path/to/your/ageha-commands.js"></script>
<script type="text/javascript" src="/path/to/your/ageha.js"></script>
```

... and init it like this:
```
$().agehaInit();
```

This way, Ageha will init with the default values you can check in the script. To overload those defaults, pass an object

```
$().agehaInit({
    'user': {
        name: 'admin@',
        color: 'f44242'
    },
    'host': {
        name: 'localhost',
        color: '028815'
    },
    'startDir': {
        name: ': /dev/null',
        color: 'ffffff'
    }
});
```

At the moment, you can overload `user`, `host` and `startDir` which will change the appearance of the prompt. I'm working on more in the future, like background- or font color. 

Do you want to add a new command? Edit the `agehaUserCommands` function and add whatever command you'd like:

```
$.fn.agehaUserCommands = function(settings, container) {
    return {
	...
	myNewCommand: {
	    action: function(){
		return "I'm a new command and will return this string on execute";
	    }
    	}
	...
       }
   };
}
```

Once you type in your new command, the function in `action` is executed. This can be a simple text message, but also any other logic you'd like. Check the existing `validCommands` object for more information.

#### Requirements:
 - Any fucking modern browser. I'm not adding IE8 support for this. It's goddamn jQuery. Should run anywhere.
 - I'm also using jQuery 3.3.1 for this, but I assume every 2.x version will be able to run perfectly fine.

#### ToDos:
 - Virtual filesystem

#### FAQ:
Q: Why?

A: Because the world doesn't have enough jQuery libraries yet.

Q: Why jQuery?

A: Because I'm lazy. Yes, I could have probably used native JS for this, I'll admit since I don't use a lot of jQuery functionality. But let's be honest, almost every goddamn website runs jQuery, just to minimize the problems that come with having different browsers on this planet. However, I will probably refactor this to make it run without any JS.
