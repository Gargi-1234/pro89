import React, { Component } from "react";
import {
  StyleSheet, Text, View, Platform,
  StatusBar, SafeAreaView, Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import firebase from "firebase";
import { Switch } from "react-native-gesture-handler";
import AppLoading from 'expo-app-loading';

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      light_theme: true,
      name: "",

    };
  }

  async fetchUser() {
    let theme, name, image
    await firebase.database().ref("/users/" + firebase.auth().currentUser.uid).on("value", function (
      snapshot
    ) {
      theme = snapshot.val().current_theme;
      name = "${snapshot.val().first_name}${snapshot.val().last_name}"
    })
    this.setState({
      name: name,
      light_theme: theme === "light" ? true : false,
      isEnabled: theme === "light" ? false : true,
    })
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  toggleSwitch() {
    const previous_state = this.state.isEnabled
    const theme = !this.state.isEnabled ? "dark" : "light"
    var updates = {}
    updates["/users/" + firebase.auth().currentUser.uid + "/current_theme"] = theme
    firebase.database().ref().update(updates);
    this.setState({ isEnabled: !previous_state, light_theme: previous_state })
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
  render() {
    if (!this.state.fontsLoaded) {
        return <AppLoading/>
    }else{
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />

        <View style={styles.appTitle} >
          <Image
            source={require("../assets/logo.png")}
            style={styles.appIcon}
          ></Image>
          <Text style={styles.appTitleText} >Spectagram</Text>
        </View>
        <View style={styles.appTitleTextContainer}>
          <View>
            <Text> {this.state.name} </Text>
          </View>
          <View>
            <Text> Dark Theme </Text>
            <Switch
              style={{
                transform: [{ scaleX: 1.3 },
                { scaleY: 1.3 }]
              }}
              trackColor={{
                false: "blue",
                true: "white"
              }}
              thumbColor={
                this.state.isEnabled ? "red" : "yellow"
              }
              ios_backgroundColor="gray"
              onValueChange={() => { this.toggleSwitch() }}
              value={this.state.isEnabled}
            />
          </View>
        </View>
      </View>
    )
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems: "center",
    justifyContent: "center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20)
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),

    marginBottom: RFValue(20)
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
})