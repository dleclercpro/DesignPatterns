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



class Application {
    private history: CommandHistory;

    public constructor() {
        this.history = new CommandHistory();
    }

    public async executeCommand(command: Command<any, any>) {
        try {
            this.history.push(command);

            return command.execute();
        } catch {
            console.error(`Could not execute command.`);
        }
    }

    public async undoCommand() {
        try {
            const command = this.history.pop();

            await command?.undo();
        } catch {
            console.error(`Could not undo command.`);
        }
    }
}



class CommandTest {

    public undo() {

    }

    async execute() {
        console.log('/*************** Command Test ***************/');

        const app = new Application();

        await app.executeCommand(new CopyCommand({ id: 'CopyCommandID' }));
        await app.executeCommand(new PasteCommand({ id: 'PasteCommandID' }));
        await app.executeCommand(new CutCommand({ id: 'CutCommandID' }));
        await app.undoCommand();

        console.log();
    }
}

export default CommandTest;