import React, { useContext } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { UsernameContext } from "../Context/Context";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
    const [username] = useContext(UsernameContext);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, {username}!</Text>
            <Text style={styles.subText}>Today is {new Date().toLocaleDateString()}</Text>

            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>You have 5 tasks pending</Text>
                <Text style={styles.statsText}>Tasks completed: 15</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Go to Todos" onPress={() => navigation.navigate("TodoLists")} />
            </View>

            <Text style={styles.tipText}>Conseil du jour : restez organisé et abordez une tâche à la fois !</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: "gray",
        marginBottom: 20,
    },
    statsContainer: {
        backgroundColor: "#e1e8ed",
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    statsText: {
        fontSize: 16,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    tipText: {
        fontSize: 14,
        color: "#6c757d",
        textAlign: "center",
        marginTop: 20,
        fontStyle: "italic",
    },
});
