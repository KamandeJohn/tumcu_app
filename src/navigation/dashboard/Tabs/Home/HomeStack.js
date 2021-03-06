import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import  Main  from "./Home";
import Details from './More';

export default createStackNavigator({
    Home: {
        screen: Main,
        navigationOptions: ({ navigation }) => ({
          title: 'Home',
          headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
            source={require("../../../../Assets/tumcu_logo.png")}
            style={{ height: 50, width: 50, margin: 10 }}
          />
              {/* <Icon
                name="bars"
                style={{
                  color: '#aaa',
                  padding: 10,
                  marginLeft: 10,
                  fontSize: 30,
                }}
              /> */}
            </TouchableOpacity>
          ),
        }),
      },
    More : Details,
});