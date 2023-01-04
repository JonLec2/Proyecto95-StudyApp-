import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import config from "../config"

const auth = getAuth(config);


let customFonts = {
  "Inter-Black": require("../assets/Fonts/SourceSansPro-Regular.ttf"),
};

const image = require("../assets/background.png");
const userimage = require("../assets/icons/user2.png");
const emailimage = require("../assets/icons/email.png");
const passwordimage = require("../assets/icons/password.png");



export default class Registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      emailuser:"",
      password:"",
    };
  }
    
  handleCreateAccount = (email, password) => {
    signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
          console.log('Acount created!')
          const user=userCredential.user
          console.log(user)
          Alert.alert("Has creado tu cuenta")
        })
        .catch(error => {
          Alert.alert(error.message);
          console.log(error)
        });
    };
  
  

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }


  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SafeAreaView style={styles.droidSafeArea} />

        <View style={styles.cuadrado}>
          <Image source={userimage} style={styles.userimage} />
        </View>

        <Text style={styles.titletext}>Crear Cuenta</Text>

        <View style={styles.contentinput}>
          <Image source={emailimage} style={styles.emailimage} />
          <TextInput
            onChangeText={text => this.setState({ email:text })}
            style={styles.textinput}
            placeholder="correo"
          ></TextInput>
        </View>

        <View style={styles.contentinput}>
          <Image source={passwordimage} style={styles.emailimage} />
          <TextInput
           onChangeText={text => this.setState({ password: text })}
            style={styles.textinput}
            placeholder="contraseña"
            secureTextEntry={true}
          ></TextInput>
        </View>


        <TouchableOpacity style={styles.buttonlogin}
        onPress={() => this.handleCreateAccount(email,password)}
        >
          <Text style={styles.logintext}>Registrate</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    alignItems: "center",
  },

  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },

  cuadrado: {
    borderRadius: 60,
    elevation: 15,
    width: RFValue(124),
    height: RFValue(124),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  userimage: {
    width: RFValue(140),
    height: RFValue(140),
  },

  titletext: {
    fontFamily: "Inter-Black",
    fontSize: RFValue(32),
    color: "white",
    marginTop: 20,
  },

  contentinput: {
    flexDirection: "row",
    width: RFValue(280),
    height: RFValue(43),
    borderRadius: 50,
    backgroundColor: "#fff",
    elevation: 15,
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 30,
  },

  textinput: {
    width: RFValue(230),
    paddingLeft: 8,
    alignItems: "center",
    fontFamily: "Inter-Black",
    fontSize: 18,
  },

  emailimage: {
    width: 30,
    height: 30,
  },



  buttonlogin: {
    backgroundColor: "#fff",
    width: 135,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    elevation: 15,
    marginTop: 20,
    marginBottom: 20,
  },

  logintext: {
    fontFamily: "Inter-Black",
    fontSize: RFValue(18),
    color: "#232323",
  },


});
