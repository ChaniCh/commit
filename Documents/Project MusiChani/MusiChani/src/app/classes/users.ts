export class users {
    static email: string;
    constructor(public id?:number, public name?:string, public email?:string, public password?:string, public image?:string, 
        public status?:boolean) {}
}