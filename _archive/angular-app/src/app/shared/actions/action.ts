import { ActionInput } from "../model/actioninput";
import { Module } from "../model/module";

export abstract class Action {
    private static counter:number = 0;
    abstract title:string;
    abstract description:string;
    abstract module:Module;
    abstract requiresConnection:boolean;

    public id:number = Action.counter++;

    abstract run(input: ActionInput):Promise<string>;
}

export class SimpleAction extends Action {
    constructor(public title:string, public module:Module, public description:string, public run:(input:ActionInput) => Promise<string>, public requiresConnection: boolean = false) {
        super();
    }
}
