
import Home from './Home'
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home
    }
});

export default createAppContainer(AppNavigator);