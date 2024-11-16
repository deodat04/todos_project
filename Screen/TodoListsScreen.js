import React, { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createTodoList, getTodoLists, deleteTodoList} from '../js/todoList';
import { TokenContext, UsernameContext } from '../Context/Context';
import TodoList from "../components/TodoList";

export default function TodoListsScreen() {
  const [todoLists, setTodoLists] = useState([]);
  const navigation = useNavigation();
  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext);

  //fetch when component is mount
  useEffect(() => {
    const fetchTodoLists = async () => {
        try {
            const todoListsFromApi = await getTodoLists(username, token);
            const normalizedTodoLists = todoListsFromApi.map((list) => ({
              ...list,
              todos: list.todos || [],
            }));  
            setTodoLists(normalizedTodoLists);
            console.log('Todo list normalized', normalizedTodoLists);
            
        } catch (error) {
            console.error('Error fetching todoLists:', error.message);
        }
    };
    fetchTodoLists();
}, [username, token]);



  const addTodoList = async () => {
    try {
      const title = `Liste ${todoLists.length + 1}`;
      const newTodoList = await createTodoList(username, title, token);
      setTodoLists([...todoLists, newTodoList]);
    } catch (error) {
      console.log("error API", error.message);
    }
  };

  const deleteList = async (id) => {
    try {
      await deleteTodoList(id, token);
      const updatedLists = todoLists.filter(list => list.id != id);
      setTodoLists(updatedLists);
    } catch (error) {
      console.log("error API", error.message);
    }
  }


  const editTodoListTitle = (todoListId, newTitle) => {
    setTodoLists((todoLists) =>
      todoLists.map((item) =>
            item.id === todoListId ? { ...item, title: newTitle } : item
        )
    );
  };

const renderTodoList = ({ item }) => {
  return (
    <TodoList
      item={item}
      todos={item.todos}  
      navigation={navigation}  
      deleteItem={deleteList} 
      editItem={editTodoListTitle} 
    />
  );
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des TodoLists</Text>
      <FlatList
        data={todoLists}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTodoList}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTodoList}>
        <Text style={styles.addButtonText}>Ajouter une nouvelle TodoList</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
