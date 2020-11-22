var edit_functions = new Array();
var edit_on = new Array();
edit_functions = document.getElementsByClassName("edit-function");
console.log(edit_functions)

var command = "";
text_area = document.getElementsByClassName("textarea")[0];
var cursor_ind = -1;

window.addEventListener('click', function(e){   
    if(document.getElementsByClassName('textarea')[0].contains(e.target))
        cursor_ind = getCaretCharacterOffsetWithin(text_area); 
    else
        console.log(cursor_ind);   
});

function getCaretPosition(editableDiv) {
    var caretPos = 0, sel, range;
    if(window.getSelection) 
    {
        sel = window.getSelection();
        if (sel.rangeCount) 
        {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == editableDiv) 
                caretPos = range.endOffset;
        }
    } 
    else if (document.selection && document.selection.createRange) 
    {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) 
        {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }

    return caretPos;
}

function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

var fileform = document.getElementById("hidden-file");
var openbutton = document.getElementsByName("openbutton")[0];
openbutton.onclick = function() {
    fileform.click();   
}

fileform.onchange = function() {
    document.getElementsByClassName("form-control")[1].placeholder = fileform.files[0].name;
    document.getElementsByName("upload button")[0].click();
}

var uploadbutton = document.getElementsByName("uploadbttn")[0];
uploadbutton.onclick = function() {
    document.getElementById("filename").innerText = document.getElementById("uploaded-file-name").value;
    if(document.getElementById("uploaded-file-name").value.trim() == "no file uploaded") {
        document.getElementById("filename").innerText = fileform.files[0].name.split(" ").filter(item => item).join(" ").substr(0,18);
    }
}

String.prototype.replaceLast = function (what, replacement) {
    return this.split(' ').reverse().join(' ').replace(new RegExp(what), replacement).split(' ').reverse().join(' ');
};

for(var i = 0; i<edit_functions.length; i++)
{
    edit_functions[i].onclick = toggleEditFunction;
    edit_on.push(0);
}

// function modifyText(event) {
//     if(this.classList.contains('tool-item-selected')) 
//     {
//         this.classList.toggle('tool-item-selected');
//         command = "";
//         return;
//     }
//     for(var i = 0; i<edit_functions.length; i++)
//     {
//         if(edit_functions[i].classList.contains('tool-item-selected'))
//         {
//             // console.log(edit_functions[i].classList.value);
//             edit_functions[i].classList.toggle('tool-item-selected');
//         }
//     }    
//     this.classList.toggle('tool-item-selected');
//     console.log(event.target.type);
//     command = event.target.type;
// }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleEditFunction(event) {
    console.log(cursor_ind);
    this.classList.toggle('tool-item-selected');
    switch(event.target.type) {
        case "bold":
        //     if(edit_on[0] == 0)
        //     {
        //         edit_on[0] = 1;
        //         text_area.innerHTML += "[BOLD]";
        //     }
        //     else
        //     {
        //         var ind = text_area.innerHTML.lastIndexOf("[BOLD]");
        //         var new_text = text_area.innerHTML.substr(ind+6);
        //         text_area.innerHTML += "[/BOLD]";
        //         sleep(500).then(() => { 
        //             text_area.innerHTML = text_area.innerHTML.substr(0, ind) + "<b>" + new_text + "</b>&nbsp;"; 
        //             edit_on[0] = 0;
        //         });
        //     }
            if(edit_on[0] == 0)
            {
                edit_on[0] = 1;
                // text_area.innerHTML += "[ITALICS]";
                text_area.innerHTML += " <b>text</b>";
            }
            else
            {
                text_area.innerHTML = text_area.innerHTML.replace("<i>text</i>","");
                text_area.innerHTML += "&nbsp";
                edit_on[0] = 0;
            }
            break;

        case "italic":
            // if(edit_on[1] == 0)
            // {
            //     edit_on[1] = 1;
            //     document.textarea.innerHTML.value += "<i>";
            // }
            // else
            // {
            //     edit_on[1] = 0;
            //     document.textarea.innerHTML.value += "</i>";
            // }
            if(edit_on[1] == 0)
            {
                edit_on[1] = 1;
                // text_area.innerHTML += "[ITALICS]";
                text_area.innerHTML = text_area.innerHTML.substr(0, cursor_ind) + " <i>text</i> " + text_area.innerHTML.substr(cursor_ind);
            }
            else
            {
                text_area.innerHTML = text_area.innerHTML.replace("<i>text</i>","");
                text_area.innerHTML += "&nbsp";
                edit_on[1] = 0;
            }
            break;

        case "underline":
            if(edit_on[2] == 0)
            {
                edit_on[2] = 1;
                document.textarea.innerHTML.value += "<u>";
            }
            else
            {
                edit_on[2] = 0;
                document.textarea.innerHTML.value += "</u>";
            }
            break;

        case "subscript":
            if(edit_on[3] == 0)
            {
                edit_on[3] = 1;
                document.textarea.innerHTML.value += "<sub>";
            }
            else
            {
                edit_on[3] = 0;
                document.textarea.innerHTML.value += "</sub>";   
            }
            break;

        case "superscript":
            if(edit_on[4] == 0)
            {
                edit_on[4] = 1;
                document.textarea.innerHTML.value += "<sup>";
            }
            else
            {
                edit_on[4] = 0;
                document.textarea.innerHTML.value += "</sup>";
            }
            break;
    }
    
}

window.onscroll = function() {myFunction()};
// Get the navbar
var navbar = document.getElementById("navbar");
// Get the offset position of the navbar
var sticky = navbar.offsetTop;
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= sticky)
        navbar.classList.add("sticky")
    else 
        navbar.classList.remove("sticky");
}