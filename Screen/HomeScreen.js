import { useContext } from "react"
import { Text } from "react-native"
import { UsernameContext } from "../Context/Context"
import { View } from "react-native-web"


export default function HomeScreen () {
    const [username, setUsername] = useContext(UsernameContext)
    return (
      <View>
          <Text>Welcome !</Text>
          <Text>You are logged as {username}</Text>
      </View>
       
    )
  }
  
