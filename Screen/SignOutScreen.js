import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';

export default function SignOutScreen({ navigation }) {
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);

    const handleSignOut = () => {
        setToken(null);
        setUsername(null);
    };

    return (
        <View>
            <Text>Welcome! You are logged as {username}</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
}



