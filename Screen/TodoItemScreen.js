import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { TokenContext } from '../Context/Context';
import { createTodo, deleteTodo, updateTodo, getTodos  } from '../js/todo';
import TodoItem from '../components/TodoItem';
import ProgressBar from '../components/progressBar'


export default function TodoItemScreen({ route, navigation }) {
    const { todoListId, todoListName } = route.params; 
    const [todos, setTodos] = useState([]); 
    const [newTextToDo, setNewTextToDo] = useState('');
    const [token] = useContext(TokenContext); 
    const [filter, setFilter] = useState('all');

    const completedTasks = todos.filter(todo => todo.done).length;
    const totalTasks = todos.length;
    

    useEffect(() => {
      const fetchTodos = async () => {
          try {
              const todosFromApi = await getTodos(todoListId, token);
              setTodos(todosFromApi);
            console.log('Todos fetch via graĥqsl', todosFromApi);
          } catch (error) {
              console.error('Error fetching todos:', error.message);
          }
      };
      fetchTodos();
  }, [todoListId, token]);


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

    // delete todo
    const deleteItem = async (id) => {
        try {
          const nodesDeleted = await deleteTodo(id, token);
          if (nodesDeleted > 0) {
            const updatedTodos = todos.filter(item => item.id !== id);
            setTodos(updatedTodos);
          } else {
            console.log('Error', 'Failed to delete item.');
          }
        } catch (error) {
            console.log('Error deleting item:', error.message);
        }
      };

     // Modifier un ToDo
     const editItem = async (id, newContent, done) => {
        try {
          const updatedTodo = await updateTodo(id, done, newContent, token);
          if (updatedTodo) {
            const updatedTodos = todos.map(item =>
              item.id === id
                ? { ...item, content: updatedTodo.content, done: updatedTodo.done } 
                : item
            );
            setTodos(updatedTodos);
          } else {
            console.log('Error: No updated todo returned.');
          }
        } catch (error) {
          console.log('Error updating item:', error.message);
        }
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
            <ProgressBar bgcolor="green" completedTasks={completedTasks} totalTasks={totalTasks} />
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
                    <Text style={styles.buttonText}>Tout cocher</Text>
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
                renderItem={({ item }) => <TodoItem item={item} todos={todos} deleteItem={deleteItem} editItem={editItem} />}
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
        backgroundColor: '#619fe8',
        borderRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})