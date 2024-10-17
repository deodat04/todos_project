import { useContext } from "react"
import { Text } from "react-native-svg"
import { UsernameContext } from "../Context/Context"


export default function HomeScreen () {
    const [username, setUsername] = useContext(UsernameContext)
    return (
      <>
        <Text>Welcome !</Text>
        <Text>You are logged as {username}</Text>
      </>
    )
  }
  

