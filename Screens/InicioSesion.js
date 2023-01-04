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
  Alert
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
const googleicon = require("../assets/icons/google.png");

export default class InicioSesion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      emailuser:"",
      password:"",
    };
  }

  handleLogin = (email, password) => {
  signInWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        console.log('Signed in')
        const user=userCredential.user
        console.log(user)
        Alert.alert("Has iniciado sesisón")
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

          <Text style={styles.titletext}>Inicio de Sesión</Text>

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

          <TouchableOpacity style={styles.buttontext}>
            <Text style={styles.text1}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonlogin}
          onPress={() => this.handleLogin(email, password)}
          >
            <Text style={styles.logintext}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <Text style={styles.logintext}>o</Text>

          <TouchableOpacity style={styles.logingoogle}>
            <Image source={googleicon} style={styles.googleimage} />
            <Text style={styles.logintext}>Continua con Google</Text>
          </TouchableOpacity>

        <TouchableOpacity 
        onPress={this.props.navigation.navigate("Registro")}
        >
          <Text style={styles.logintext}>Crea una cuenta con tu correo</Text>
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

  buttontext: {
    marginTop: 12,
    marginLeft: RFValue(60),
  },

  text1: {
    fontFamily: "Inter-Black",
    fontSize: RFValue(18),
    color: "#232323",
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
    marginBottom: 30,
  },

  logintext: {
    fontFamily: "Inter-Black",
    fontSize: RFValue(18),
    color: "#232323",
  },

  logingoogle: {
    backgroundColor: "#fff",
    width: 256,
    height: 43,
    alignItems: "center",
    borderRadius: 30,
    elevation: 15,
    marginTop: 20,
    marginBottom: 30,
    flexDirection: "row",
  },

  googleimage: {
    width: 36,
    height: 36,
    marginLeft: 15,
    marginRight: 10,
  },
});
