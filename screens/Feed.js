import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {  FlatList } from "react-native-gesture-handler";
import PostCard from "./PostCard";


let posts = require("./temp_posts.json");

export default class Feed extends Component {
  
  constructor(props){
    super(props);
    this.state={
      posts : []
    }
  }

  componentDidMount(){

  }

  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigaton={this.props.navigaton} />;
  };

  keyExtractor = (item, index) => index.toString();


  fetchPosts = () =>{
    firebase
    .database()
    .ref("/posts/")
    .on(
      "value",
      snapshot => {
        let posts = []
        if(snapshot.val()){
          Object.keys(snapshot.val()).forEach(function(key){
            posts.push({
              key:key,
              value:snapshot.val()[key]
            })
          })
        }
        this.setState({posts : posts})
        this.props.setUpdateToFalse();
      },
      function (errorObject){
        console.log("The read failed: " + errorObject.code);
      }
      );
  };

  render() {
      return (
        <TouchableOpacity
        style={
          this.state.light_theme ? styles.containerLight : styles.container
        }
        onPress={() =>
          this.props.navigation.navigate("PostScreen", {
            post: this.props.post
          })
        }
      >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
            <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                SPECTAGRAM
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={posts}
              renderItem={this.renderItem}
            />
          </View>
        </TouchableOpacity>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
  },
  cardContainer: {
    flex: 0.85
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
});
