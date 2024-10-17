/* import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createTodoList } from '../js/todoList';
import { TokenContext, UsernameContext } from '../Context/Context';

export default function TodoListsScreen(props) {
  const [todoLists, setTodoLists] = useState([]);
  const navigation = useNavigation();


  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext)


  const addTodoList = async () => {
    try {
      const title = `Liste ${todoLists.length + 1}`;
      const newTodoList = await createTodoList(username, title, token); 
      setTodoLists([...todoLists, newTodoList]);
    } catch (error) {
      setErrorMessage(error.message);
      console.log("error API", error.message); 
    }
  };


  const renderTodoList = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Items', { todoListId: item.id, todoListName: item.content })}
      >
        

        <Text style={styles.listTitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des TodoLists</Text>
      <FlatList
        data={todoLists}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTodoList}
      />
      <Button title="Ajouter une nouvelle TodoList" onPress={addTodoList} />
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
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  listTitle: {
    fontSize: 18,
  },
}); */


import React, { useState, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createTodoList } from '../js/todoList';
import { TokenContext, UsernameContext } from '../Context/Context';


export default function TodoListsScreen(props) {
  const [todoLists, setTodoLists] = useState([]);
  const navigation = useNavigation();
  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext);

  const addTodoList = async () => {
    try {
      const title = `Liste ${todoLists.length + 1}`;
      const newTodoList = await createTodoList(username, title, token); 
      setTodoLists([...todoLists, newTodoList]);
    } catch (error) {
      console.log("error API", error.message); 
    }
  };

  const renderTodoList = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Items', { todoListId: item.id, todoListName: item.title })}
      >
        <Text style={styles.listTitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

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
  listItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  listTitle: {
    fontSize: 18,
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
