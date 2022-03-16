abstract class RouteStrategy {

    public abstract buildRoute(a: string, b: string): void;
}

class RoadStrategy extends RouteStrategy {

    public buildRoute(a: string, b: string) {
        console.log(`Building road from ${a} to ${b}...`);
    }
}

class WalkingStrategy extends RouteStrategy {

    public buildRoute(a: string, b: string) {
        console.log(`Building sidewalk from ${a} to ${b}...`);
    }
}

class PublicTransportStrategy extends RouteStrategy {

    public buildRoute(a: string, b: string) {
        console.log(`Building train tracks from ${a} to ${b}...`);
    }
}



class RouteNavigator {
    private strategy: RouteStrategy;

    public constructor() {
        this.strategy = new RoadStrategy();
    }

    public setStrategy(strategy: RouteStrategy) {
        this.strategy = strategy;
    }

    public buildRoute(a: string, b: string) {
        this.strategy.buildRoute(a, b);
    }
}



class StrategyTest {

    async execute() {
        console.log('/*************** Strategy Test ***************/');

        const routeNavigator = new RouteNavigator();
        routeNavigator.buildRoute('45 chemin Bates', '50 chemin Bates');

        routeNavigator.setStrategy(new PublicTransportStrategy());
        routeNavigator.buildRoute('Montréal', 'Toronto');

        console.log();
    }
}

export default StrategyTest;