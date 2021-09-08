export default class Player {
    name = "";
    color = "black";
    
    constructor(name, color, sign) {
        this.name = name;
        this.color = color;
        this.sign = name[0];
    }

    Color() {
        return this.color;
    }
}