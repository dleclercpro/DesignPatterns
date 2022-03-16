class Database {
    private static instance?: Database;
    private database: Map<string, string>;

    private constructor() {
        this.database = new Map();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }

        return this.instance;
    }

    public has(id: string) {
        return this.database.has(id);
    }

    public add(id: string, value: string) {
        if (this.has(id)) {
            console.error(`Item '${id}' already exists in database!`);
        }

        this.database.set(id, value);
        console.log(`Added item ${id}`);
    }

    public remove(id: string) {
        this.database.delete(id);
        console.log(`Removed item ${id}`);
    }

    public list() {
        const database: Record<string, string> = {};
        
        this.database.forEach((value: string, id: string) => {
            database[id] = value;
        });

        console.log(JSON.stringify(database, null, 2));
    }
}



class SingletonTest {

    async execute() {
        console.log('/*************** Singleton Test ***************/');

        const db = Database.getInstance();

        db.add('1', 'Test1');
        db.add('2', 'Test2');
        db.list();

        db.remove('2');
        db.list();
        
        db.add('1', 'InvalidTest');
        db.list();

        console.log();
    }
}

export default SingletonTest;