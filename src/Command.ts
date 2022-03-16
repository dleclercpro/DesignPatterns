interface Argument {

}

interface Result {
    code: number;
}

abstract class Command<Arg extends Argument, Res extends Result> {
    protected argument: Arg;
    protected result?: Res;

    protected name: string;
    protected app?: Application;

    public abstract execute(): Promise<Res>;
    public abstract undo(): Promise<void>;

    public constructor(argument: Arg, name: string, app: Application) {
        this.argument = argument;
        this.name = name;
        this.app = app;
    }

    public getName() {
        return this.name;
    }
}



class CommandHistory {
    private history: Command<any, any>[];

    public constructor() {
        this.history = [];
    }

    public push(command: Command<any, any>) {
        this.history.push(command);
    }

    public pop() {
        return this.history.pop();
    }
}



interface CopyArgument extends Argument { }
interface CutArgument extends Argument { }
interface PasteArgument extends Argument { }
interface UndoArgument extends Argument { }

interface CopyResult extends Result { }
interface CutResult extends Result { }
interface PasteResult extends Result { }
interface UndoResult extends Result { }

class CopyCommand extends Command<CopyArgument, CopyResult> {

    public async execute() {
        console.log(`Executing ${this.name} command...`);

        this.app?.history.push(this);

        this.result = {
            code: 0,
        };

        return this.result;
    }

    public async undo() {
        console.log(`Undoing ${this.name} command...`);
    }
}

class CutCommand extends Command<CutArgument, CutResult> {

    public async execute() {
        console.log(`Executing ${this.name} command...`);

        this.app?.history.push(this);

        this.result = {
            code: 0,
        };

        return this.result;
    }

    public async undo() {
        console.log(`Undoing ${this.name} command...`);
    }
}

class PasteCommand extends Command<PasteArgument, PasteResult> {

    public async execute() {
        console.log(`Executing ${this.name} command...`);

        this.app?.history.push(this);

        this.result = {
            code: 0,
        };

        return this.result;
    }

    public async undo() {
        console.log(`Undoing ${this.name} command...`);
    }
}

class UndoCommand extends Command<UndoArgument, UndoResult> {

    public async execute() {
        const command = this.app?.history.pop();

        if (command) {
            console.log(`Undoing ${command.getName()} command...`);
        }

        this.result = {
            code: 0,
        };

        return this.result;
    }

    public async undo() {

    }
}



enum ButtonType {
    Copy = 'Copy',
    Cut = 'Cut',
    Paste = 'Paste',
    Undo = 'Undo',
}

class Button {
    protected app: Application;
    protected command?: Command<any, any>;

    public constructor(app: Application) {
        this.app = app;
    }

    public setCommand(command: Command<any, any>) {
        this.command = command;
    }

    public async click() {
        return this.command?.execute();
    }
}

class CopyButton extends Button {
    
    public constructor(app: Application) {
        super(app);

        this.setCommand(new CopyCommand({ }, 'Copy', app));
    }
}

class CutButton extends Button {
    
    public constructor(app: Application) {
        super(app);
        
        this.setCommand(new CutCommand({ }, 'Cut', app));
    }
}

class PasteButton extends Button {
    
    public constructor(app: Application) {
        super(app);
        
        this.setCommand(new PasteCommand({ }, 'Paste', app));
    }
}

class UndoButton extends Button {

    public constructor(app: Application) {
        super(app);

        this.setCommand(new UndoCommand({ }, 'Undo', app));
    }
}



class Application {
    public history: CommandHistory;
    public buttons: Record<ButtonType, Button>;

    public constructor() {
        this.history = new CommandHistory();
        this.buttons = {
            [ButtonType.Copy]: new CopyButton(this),
            [ButtonType.Cut]: new CutButton(this),
            [ButtonType.Paste]: new PasteButton(this),
            [ButtonType.Undo]: new UndoButton(this),
        };
    }
}



class CommandTest {

    public undo() {

    }

    async execute() {
        console.log('/*************** Command Test ***************/');

        const app = new Application();

        await app.buttons['Copy'].click();
        await app.buttons['Paste'].click();
        await app.buttons['Undo'].click();
        await app.buttons['Cut'].click();
        await app.buttons['Paste'].click();

        console.log();
    }
}

export default CommandTest;