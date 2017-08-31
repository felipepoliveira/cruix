var adaptFunctions = [];

//Bootstrap
window.addEventListener('load', () => {
    loadAdaptations();
});

/**
 * Add an adapter function to the adapter function callback list
 * @param {function} adapter 
 */
function addAdapter(adapter){
    adaptFunctions.push(adapter);
}

/**
 * Adapt all inputs file to correspond with cruix ui
 */
function adaptInputFile(){
    //Iterate over all input files
    var $inputFiles = document.querySelectorAll("input[type=file]");
    console.log($inputFiles);
    for(var i = 0; i < $inputFiles.length; i++){
        var $inputFile = $inputFiles[i];

        //Add the custom input file button in the dom
        var inputFileButton = document.createElement("button");
        inputFileButton.type = "button";

        //Transfer the attributes from the original element to another
        transferAttributes($inputFile, inputFileButton, "id");
        inputFileButton.innerHTML = removeAndReturnAttribute($inputFile, "placeholder"); //Put the placeholder as inner html of the button

        //Put the click event into the button
        inputFileButton.addEventListener('click', function(){
            $inputFile.click(); 
        });

        //Put the button after the input file
        $inputFiles[i].parentElement.appendChild(inputFileButton, $inputFile);

        //Remove the display, and put the input file in the end of the form
        $inputFile.style.display = "none";
        $inputFile.remove();
        var newParent = ($inputFile.form) ? $inputFile.form : document.body;
        newParent.appendChild($inputFile);
    }
}
addAdapter(adaptInputFile);

/**
 * Call all adapt functions callbacks
 */
function loadAdaptations(){
    for(var i = 0; i < adaptFunctions.length; i++){
        adaptFunctions[i]();
    }
}

function removeAndReturnAttribute(element, attribute){
    var attr = element.getAttribute(attribute);
    element.removeAttribute(attribute);

    return attr;
}

/**
 * Get each attribute, put the origin attribute in the destiny, after that remove tha attribute 
 * from the origin
 * @param {Element} origin 
 * @param {Element} destiny 
 * @param {Array} attrs 
 */
function transferAttributes(origin, destiny, attrs){
    //If the attributes is not an array transform it into one
    if(!Array.isArray(attrs)){
        attrs = [attrs];
    }

    //Get each attribute, put the origin attribute in the destiny, after that remove tha attr 
    //from the origin
    for(var i = 0; i < attrs.length; i++){
        destiny.setAttribute(attrs[i], origin.getAttribute(attrs[i]));
        origin.removeAttribute(attrs[i]);
    }
}