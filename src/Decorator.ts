export class Notifier {

    public send(msg: string) {

    }
}

abstract class NotifierDecorator extends Notifier {
    private wrappee: Notifier;

    public constructor(wrappee: Notifier) {
        super();
        this.wrappee = wrappee;
    }

    public send(msg: string) {
        this.wrappee.send(msg);
    }
}



// Concrete notifiers
export class SMSNotifier extends NotifierDecorator {

    public send(msg: string) {
        super.send(msg);
        console.log(`SMS sent: ${msg}`);
    }
}

export class FacebookNotifier extends NotifierDecorator {

    public send(msg: string) {
        super.send(msg);
        console.log(`Facebook message sent: ${msg}`);
    }
}

export class SlackNotifier extends NotifierDecorator {

    public send(msg: string) {
        super.send(msg);
        console.log(`Slack message sent: ${msg}`);
    }
}



interface NotificationServices {
    'SMS': boolean,
    'Facebook': boolean,
    'Slack': boolean,
}

class DecoratorTest {
    private notifier: Notifier;
    private services: NotificationServices;

    public constructor() {
        this.notifier = new Notifier();
        this.services = {
            'SMS': true,
            'Facebook': false,
            'Slack': true,
        };
    }

    async execute() {
        console.log('/*************** Decorator Test ***************/');

        if (this.services['SMS']) {
            this.notifier = new SMSNotifier(this.notifier);
        }
        if (this.services['Facebook']) {
            this.notifier = new FacebookNotifier(this.notifier);
        }
        if (this.services['Slack']) {
            this.notifier = new SlackNotifier(this.notifier);
        }

        this.notifier.send('Hello!');
        
        console.log();
    }
}

export default DecoratorTest;