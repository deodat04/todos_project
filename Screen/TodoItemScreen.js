import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { TokenContext } from '../Context/Context';
import { createTodo } from '../js/todo';
import TodoItem from '../components/TodoItem';

export default function TodoItemScreen({ route, navigation }) {
    const { todoListId, todoListName } = route.params; 
    const [todos, setTodos] = useState([]); 
    const [newTextToDo, setNewTextToDo] = useState('');
    const [token] = useContext(TokenContext); 
    const [filter, setFilter] = useState('all');

    const addNewToDo = async () => {
        if (newTextToDo.trim()) {
            try {
                const newTodo = await createTodo(newTextToDo, todoListId, token); 
                setTodos((prevTodos) => [...prevTodos, newTodo]); 
                setNewTextToDo(''); 
            } catch (error) {
                console.log('Error adding todo:', error.message);
            }
        }
    };

    const deleteItem = (id) => {
        setTodos((prevTodos) => prevTodos.filter(item => item.id !== id)); 
    };

    const editItem = (id, newContent) => {
        setTodos((prevTodos) =>
            prevTodos.map((item) =>
                item.id === id ? { ...item, content: newContent } : item
            )
        );
    };

    const filtersToDo = todos.filter(todo => {
        if (filter === 'done') return todo.done;
        if (filter === 'not_done') return !todo.done;
        return true;
    });

    const checkAll = () => {
        setTodos(todos.map(item => ({ ...item, done: true })));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todos for {todoListName}</Text>
            <TextInput
                onChangeText={setNewTextToDo}
                value={newTextToDo}
                placeholder="Enter todo content"
                onSubmitEditing={addNewToDo}
                style={styles.textInput}
            />
            <Button
                onPress={addNewToDo}
                title="Add ToDo"
                style={styles.button}
            />
            <View style={styles.filtersContainer}>
                <TouchableOpacity onPress={checkAll} style={styles.buttonFilter}>
                    <Text style={styles.buttonText}>Check all</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('all')} style={styles.buttonFilter}>
                    <Text style={styles.buttonText}>Tout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('done')} style={styles.buttonFilter}>
                    <Text style={styles.buttonText}>Fait</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('not_done')} style={styles.buttonFilter}>
                    <Text style={styles.buttonText}>Non fait</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ paddingLeft: 10 }}
                data={filtersToDo}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <TodoItem item={item} deleteItem={deleteItem} editItem={editItem} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#00aaff',
        borderRadius: 8,
        marginBottom: 10,
    },
    filtersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    buttonFilter: {
        padding: 10,
        backgroundColor: '#007acc',
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


