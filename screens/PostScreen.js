import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import firebase from "firebase";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();


let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};


export default class PostScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            light_theme: true,
        };
    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
    }

    fetchUser = () => {
        let theme;
        firebase
            .database()
            .ref("/user/" + firebase.auth().currentUser.uid)
            .on("value", (snapshot) => {
                theme = snapshot.val().current_theme
                this.setState({ light_theme: theme })
            })
    }
    render() {
        if (!this.props.route.params) {
            this.props.navigation.navigate("Home");
        } else if (this.state.fontsLoaded) {
            SplashScreen.hideAsync();
            return (
                <View
                    style={
                        this.state.light_theme ? styles.containerLight : styles.container
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
                                Spectagram
                            </Text>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <ScrollView
                            style={
                                this.state.light_theme
                                    ? styles.postCardLight
                                    : styles.postCard
                            }
                        >
                            <Image
                                source={require("../assets/profile_img.png")}
                                style={(styles.profileImage)}
                            ></Image>
                            <View style={styles.dataContainer}>
                                <View style={styles.titleTextContainer}>
                                    <Text
                                        style={
                                            this.state.light_theme
                                                ? styles.authorNameTextLight
                                                : styles.authorNameText
                                        }
                                    >
                                        {this.props.route.params.story.value.author}
                                    </Text>
                                    <Text
                                        style={
                                            this.state.light_theme
                                                ? styles.authorNameTextLight
                                                : styles.authorNameText
                                        }
                                    >
                                        {this.props.route.params.story.value.created_on}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.captionContainer}>
                                <Text style={
                                    this.state.light_theme
                                        ? styles.captionTextLight
                                        : styles.captionText
                                }>
                                    {this.props.post.caption}
                                </Text>
                                <Image source={require("../assets/post.jpeg")} style={styles.postimage} />
                            </View>
                            <View style={styles.actionContainer}>
                                <TouchableOpacity
                                    style={
                                        this.state.is_liked
                                            ? styles.likeButtonLiked
                                            : styles.likeButtonDisliked
                                    }
                                    onPress={() => {

                                    }}
                                >
                                    <Ionicons
                                        name={"heart"}
                                        size={RFValue(30)}
                                        color={this.state.light_theme ? "black" : "white"}
                                    />

                                    <Text
                                        style={
                                            this.state.light_theme
                                                ? styles.likeTextLight
                                                : styles.likeText
                                        }
                                    >
                                        12k
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            )
        }
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
        fontFamily: "Bubblegum-Sans"
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
    },
    cardContainer: {
        flex: 1
    },
    postCard: {
        margin: RFValue(20),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
    },
    postCardLight: {
        margin: RFValue(20),
        backgroundColor: "white",
        borderRadius: RFValue(20),
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2
    },
    profileImage: {
        width: "10%",
        height: "10%",
        resizeMode: "contain",
        borderRadius: RFValue(100),
    },
    dataContainer: {
        flexDirection: "row",
        padding: RFValue(20)
    },
    titleTextContainer: {
        flex: 0.8
    },
    authorNameText: {
        color: "white",
        fontSize: RFValue(20)
    },
    authorNameTextLight: {
        color: "black",
        fontSize: RFValue(20)
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: RFValue(10)
    },
    captionContainer: {
        padding: RFValue(20)
    },
    captionText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(15),
        color: "white"
    },
    captionTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(15),
        color: "black"
    },
    likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    },
    likeTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    }
})