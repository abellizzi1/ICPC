export class validator {

    // simple constructor to call validation functions
    constructor() {

    }

    // Function that edits a textbox's font size, box scale, and color scheme to the "invalid" style
    colorInvalidInput(textbox: HTMLElement | null): void {
        if(textbox != null) {
            textbox.style.fontSize = "x-large";
            textbox.style.backgroundColor = "red";
        }
    }
    
    // Function that edits a textbox's font size, box scale, and color scheme to the "valid" style
    colorValidInput(textbox: HTMLElement | null): void {
        if(textbox?.style.backgroundColor === "red") {
            textbox.style.fontSize = "";
            textbox.style.backgroundColor = "";
        }
    }
}