enum EventType {
    Email = 'Email',
    SMS = 'SMS',
}

abstract class Publisher {
    private subscribers: Map<EventType, Map<string, Subscriber>>;

    public constructor() {
        this.subscribers = new Map();
        
        Object.values(EventType).forEach((eventType: EventType) => {
            this.subscribers.set(eventType, new Map());
        });
    }

    public subscribe(eventType: EventType, subscriber: Subscriber) {
        const eventSubscribers = this.subscribers.get(eventType)!;

        eventSubscribers.set(subscriber.getId(), subscriber);

        this.subscribers.set(eventType, eventSubscribers);
    }

    public unsubscribe(eventType: EventType, subscriber: Subscriber) {
        const eventSubscribers = this.subscribers.get(eventType)!;

        eventSubscribers.delete(subscriber.getId());

        this.subscribers.set(eventType, eventSubscribers);
    }

    public notify(eventType: EventType, data: any) {
        const eventSubscribers = this.subscribers.get(eventType)!;

        eventSubscribers.forEach((subscriber: Subscriber) => {
            subscriber.update(data);
        });
    }
}

abstract class Subscriber {
    private id: string;

    public abstract update(data: any): void;

    public constructor(id: string) {
        this.id = id;
    }

    public getId() {
        return this.id;
    }
}



/* Concrete examples */
class Messager {
    public events: EventsManager;

    public constructor() {
        this.events = new EventsManager();
    }

    public sendEmail(email: string) {
        console.log(`Sending e-mail: ${email}`);
        this.events.notify(EventType.Email, email);
    }

    public sendSMS(sms: string) {
        console.log(`Sending SMS: ${sms}`);
        this.events.notify(EventType.SMS, sms);
    }
}

class EventsManager extends Publisher {

}



class EmailListener extends Subscriber {

    public update(email: any) {
        console.log(`E-mail notification: ${email}.`)
    }
}

class SMSListener extends Subscriber {

    public update(sms: any) {
        console.log(`SMS notification: ${sms}.`)
    }
}



class ObserverTest {

    async execute() {
        console.log('/*************** Observer Test ***************/');

        const messager = new Messager();
        const emailListener = new EmailListener('EmailListener1');
        const smsListener = new SMSListener('SMSListener1');

        messager.events.subscribe(EventType.Email, emailListener);
        messager.events.subscribe(EventType.SMS, smsListener);

        messager.sendEmail('EmailTest');
        messager.sendSMS('SMSTest');

        console.log();
    }
}

export default ObserverTest;