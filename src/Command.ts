interface CommandArgument {
    id: string;
}

interface CommandResult {
    success: boolean;
}

abstract class Command<Argument extends CommandArgument, Result extends CommandResult> {
    protected argument: Argument;
    protected result?: Result;

    public abstract execute(): Promise<Result>;
    public abstract undo(): Promise<void>;

    public constructor(argument: Argument) {
        this.argument = argument;
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



interface CopyArgument extends CommandArgument { }
interface CutArgument extends CommandArgument { }
interface PasteArgument extends CommandArgument { }

interface CopyResult extends CommandResult { }
interface CutResult extends CommandResult { }
interface PasteResult extends CommandResult { }

class CopyCommand extends Command<CopyArgument, CopyResult> {

    public async execute() {
        console.log('Executing copy command...');

        this.result = {
            success: true,
        };

        return this.result;
    }

    public async undo() {
        console.log('Undoing copy command...');
    }
}

class CutCommand extends Command<CutArgument, CutResult> {

    public async execute() {
        console.log('Executing cut command...');

        this.result = {
            success: true,
        };

        return this.result;
    }

    public async undo() {
        console.log('Undoing cut command...');
    }
}

class PasteCommand extends Command<PasteArgument, PasteResult> {

    public async execute() {
        console.log('Executing paste command...');

        this.result = {
            success: true,
        };

        return this.result;
    }

    public async undo() {
        console.log('Undoing paste command...');
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
        if (!this.command) return;

        try {
            this.app.history.push(this.command);

            return this.command.execute();

        } catch {
            console.error(`Could not execute command.`);
        }
    }
}

class CopyButton extends Button {
    
    public constructor(app: Application) {
        super(app);

        this.setCommand(new CopyCommand({ id: 'CopyCommandID' }));
    }
}

class CutButton extends Button {
    
    public constructor(app: Application) {
        super(app);
        
        this.setCommand(new CutCommand({ id: 'CutCommandID' }));
    }
}

class PasteButton extends Button {
    
    public constructor(app: Application) {
        super(app);
        
        this.setCommand(new PasteCommand({ id: 'PasteCommandID' }));
    }
}

class UndoButton extends Button {

    public constructor(app: Application) {
        super(app);
    }

    public async click() {

        try {
            const command = this.app.history.pop();

            await command?.undo();

        } catch {
            console.error(`Could not undo command.`);
        }
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