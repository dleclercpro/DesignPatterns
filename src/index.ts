import CommandTest from './Command';
import DecoratorTest from './Decorator';
import ObserverTest from './Observer';
import SingletonTest from './Singleton';
import StrategyTest from './Strategy';
import VisitorTest from './Visitor';

Promise.resolve()
    .then(() => new SingletonTest().execute())
    .then(() => new DecoratorTest().execute())
    .then(() => new CommandTest().execute())
    .then(() => new ObserverTest().execute())
    .then(() => new StrategyTest().execute())
    .then(() => new VisitorTest().execute())
    
    .catch();