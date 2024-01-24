import Person from "./Person";

export default class Student implements Person {
    private fullName:string;

    constructor(public firstName:string, 
                public lastName:string) {
        this.fullName = this.firstName + " " + this.lastName;
    }

    public show():string {
        return this.fullName;
    }
}