const Keyboard={
    elements:{
        main: null,
        keysContainer: null,
        keys:[]
    },

    eventHandlers:{
        oninput: null,
        onclose: null,
    },
    properties: {
        value:"",
        capslock:false,
    },

    //functions
    init(){
        //create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        //setup main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard-keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".btn");

        //add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
        
    },

    _createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        //create html for icons
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace","p","enter","?"].indexOf(key) != -1;
            
            keyElement.setAttribute("type","button");
            keyElement.classList.add("btn");

            switch(key)
            {
                case "backspace":
                    keyElement.classList.add("wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click",()=>{
                        this.properties.value = this.properties.value.substring(0,this.properties.value.length-1);
                        this._triggerEvent("oninput");

                    });
                    break;

                case "caps":
                    keyElement.classList.add("wide","activable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click",()=>{
                        this._toggleCapslock();
                        keyElement.classList.toggle("active",this.properties.capslock);
                    });
                    break;

                case "enter":
                    keyElement.classList.add("wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click",()=>{
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");

                    });
                    break;
                    
                case "space":
                    keyElement.classList.add("extrawide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click",()=>{
                        this.properties.value += " ";
                        this._triggerEvent("oninput");

                    });
                    break;

                case "done":
                    keyElement.classList.add("wide","dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click",()=>{
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    break;

                default:
                    keyElement.textContent = key;

                    keyElement.addEventListener("click",()=>{
                        if(this.properties.capslock == false){
                            this.properties.value += key.toLowerCase();
                        }
                        else{
                            this.properties.value += key.toUpperCase();
                        }
                        this._triggerEvent("oninput");

                    });
                    break;
                
            }  //end of switch case

            fragment.appendChild(keyElement);
            if(insertLineBreak)
            {
                fragment.appendChild(document.createElement("br"));
            }
        });
        return fragment;

    },

    _toggleCapslock(){

        this.properties.capslock = !this.properties.capslock;
        for (const key of this.elements.keys)
        {
            if(key.childElementCount == 0)
            {
                key.textContent = this.properties.capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _triggerEvent(handlerName){
        if(typeof this.eventHandlers[handlerName] == "function")
        {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },
    open(initialValue,oninput,onclose){
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard-hidden");
    },
    close(initialValue,oninput,onclose){
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard-hidden");
    },


};

window.addEventListener("DOMContentLoaded",function(){
    Keyboard.init();
    Keyboard.open("hi ",function(currentValue){console.log(currentValue);},
    function(currentValue){console.log("final vaue"+currentValue);});
});