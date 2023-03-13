import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

export default class PostCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      post_id: this.props.post.key,
      post_data: this.props.post.value,
    }
  }

  render() {
    return (
      <TouchableOpacity
      style={styles.container}
      onPress={() =>
        this.props.navigation.navigate("PostScreen", {
          post: this.props.post
        })
      }
    >
  
        <View style={(styles.cardContainer)} >
          <View style={styles.captionContainer}>

            <View style={(styles.authorContainer)} >

              <View style={(styles.authorImageContainer)} >
                <Image
                  source={require("../assets/profile_img.png")}
                  style={(styles.profileImage)}
                ></Image>
              </View>
              <View style={(styles.authorNameContainer)}>
                <Text style={styles.authorNameText}> {this.props.post.author} </Text>
              </View>

            </View>

           

          </View>

          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={"heart"}
                size={RFValue(30)}
                color={"white"}
              />
              <Text style={styles.likeText}>12k</Text>
            </View >
          </View>

        </View>
</TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "contain"
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },

  captionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  authorContainer: {
    flex: 0.07,
    justifyContent: "center",
    resizeMode: "contain",
    },
  profileImage: {
    width: "10%",
    height: "10%",
    resizeMode: "contain",
    borderRadius: RFValue(100),
  
  },
  authorImageContainer: {
    width: "100%",
    height: "10%",
    resizeMode: "contain"
  },
  authorNameContainer:{
  
  },
  authorNameText: {
    marginTop : 5,
    color: "white",
    fontSize: RFValue(20),
  justifyContent : "center"
  },
});
