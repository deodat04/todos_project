import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { TokenContext, UsernameContext } from "../Context/Context";
import { useState } from "react";
import { signUp } from "../js/sign";


export default function SignUpScreen ({ navigation }) { 

  const [usernameState, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username = '', setUsername]) => {
            return ( 
              <View style={styles.container}>
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                <TextInput
                    placeholder="Username"
                    value={usernameState}
                    onChangeText={setUsernameState}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Button title="Sign Up" onPress={() => {
                    signUp(usernameState, password).then(    
                        (token) => {
                                setToken(token);
                                setUsername(usernameState);
                        }).catch(err => {
                        setErrorMessage(err.message)
                        });
                    }} />
              </View>
            );
          }}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  );
  
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
});
