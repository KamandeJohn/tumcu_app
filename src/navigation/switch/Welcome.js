import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      istext: false,
      text: "",
      arrowcolor: "white",
      textLength: "",
      isLoading: "none",
      verify: false,
    };
  }

 
  _pushNumber = async () => {
    this.setState({
      isLoading: "flex"
    });
    const url = `https://mtumcu.herokuapp.com/api/u/signup`;
    const data = { phone: "254" + this.state.text };
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let res = await response.json();
      if (res.error) {
        throw new Error(res.error);
      }
      this.setState({ verify: true });
      this.props.navigation.navigate('Confirm')
      // alert("Verification on progress");

      this.setState({ isLoading: "none" });
    } catch (err) {
      this.setState({ isLoading: "none" });
      alert("Error try again");
    }
  };

  render() {
    return (
      <ImageBackground
        source={require("../../Assets/hex.png")}
        style={{ width: "100%", height: "100%" }}
      >

        <View
          style={{
            display: this.state.isLoading,
            postion: "absolute",
            top: height / 2,
            width: 60,
            height: 60,
            justifyContent: "center",
            paddingLeft: width / 2
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>

        <View style={styles.LogoContainer}>
          <Image
            source={require("../../Assets/tumcu_logo.png")}
            style={[
              this.state.istext === true
                ? {
                    alignSelf: "center",
                    width: "30%",
                    height: "30%",
                    backgroundColor: "white"
                  }
                : {
                    width: "40%",
                    height: "40%",
                    backgroundColor: "rgba(255,255,255, 0.5)"
                  }
            ]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.inputContainer}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(52, 52, 52, 0.3)",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                paddingLeft: 20,
                color: "white",
                fontWeight: "500"
              }}
            >
              Get started with Tum Cu
            </Text>
          </View>
          <View
            style={{
              flex: 1.5,
              backgroundColor: "rgba(52, 52, 52, 0.2)",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../../Assets/flag.png")}
              style={{ height: 20, width: 20, marginLeft: 10 }}
              resizeMode="cover"
            />
            <Text style={styles.text}> +{"254"}</Text>
            <TextInput
              keyboardType="numeric"
              autoFocus={false} // ....................focus and show the keyboard...........................
              placeholder="Enter your Phone number.."
              placeholderTextColor="lightgray"
              style={styles.textInput}
              maxLength={9}
              value={this.state.text}
              onFocus={() =>
                this.setState({
                  istext: true
                })
              }
              onChangeText={text =>
                this.setState({
                  text: text,
                  textLength: text.length
                })
              }
              //.................... handle input changes.........................
              onSubmitEditing={() => this.state.text}
            />
            <Icon
              onPress={() => {
                this._pushNumber();
              }}
              name="arrowright"
              size={35}
              style={
                this.state.textLength === 9
                  ? {
                      color: this.state.arrowcolor,
                      paddingHorizontal: 10,
                      fontWeight: "bold"
                    }
                  : { color: "transparent" }
              }
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  LogoContainer: {
    flex: 2,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "transparent"
  },
  textInput: {
    flex: 1,
    minHeight: 35,
    fontSize: 20,
    color: "white",
    fontWeight: "500"
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: "500"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
