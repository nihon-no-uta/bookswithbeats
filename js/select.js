// function addMusic() {
//     // el.addEventListener('contextmenu', function(ev) {
//     //     ev.preventDefault();
//     //     alert('success!');
//     //     return false;
//     // }, false);

//     var person = prompt("Please enter your name", "Harry Potter");

//     if (person == null || person == "") {
//       txt = "User cancelled the prompt.";
//     } else {
//       txt = "Hello " + person + "! How are you today?";
//     }
// }

var edit_functions = new Array();
edit_functions = document.getElementsByClassName("edit-function");
console.log(edit_functions)

var command = "";

text_area = document.getElementsByClassName("textarea")[0];
console.log(text_area);

text_area.onmouseup = function() {
    console.log(document.getSelection().toString());
    if(command == "");
    else
        document.execCommand(command);
}

for(var i = 0; i<edit_functions.length; i++)
{
    edit_functions[i].onclick = modifyText;
}

function modifyText(event) {
    if(this.classList.contains('tool-item-selected')) 
    {
        this.classList.toggle('tool-item-selected');
        command = "";
        return;
    }
    for(var i = 0; i<edit_functions.length; i++)
    {
        if(edit_functions[i].classList.contains('tool-item-selected'))
        {
            // console.log(edit_functions[i].classList.value);
            edit_functions[i].classList.toggle('tool-item-selected');
        }
    }    
    this.classList.toggle('tool-item-selected');
    console.log(event.target.type);
    command = event.target.type;
}
// document.oncontextmenu = RightMouseDown;
// document.onmousedown = mouseDown; 

// function mouseDown(e) {
//     if (e.which == 3) 
//     {
//         var person = prompt("Please enter your name", "Harry Potter");
//         if (person == null || person == "") 
//             txt = "User cancelled the prompt.";
//         else 
//             txt = "Hello " + person + "! How are you today?";
//     }
// }

// function RightMouseDown() { return false; }