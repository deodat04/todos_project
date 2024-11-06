import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { TokenContext } from '../Context/Context';
import { createTodo, updateTodo, deleteTodo, getTodos } from '../js/todo';
import TodoItem from '../components/TodoItem';
import DropDownPicker from 'react-native-dropdown-picker';



export default function TodoItemScreen({ route, navigation }) {
    const { todoListId, todoListName } = route.params; 
    const [todos, setTodos] = useState([]); 
    const [newTextToDo, setNewTextToDo] = useState('');
    const [token] = useContext(TokenContext); 
    const [filter, setFilter] = useState('all');
    const [open, setOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [items] = useState([
        { label: 'Tout', value: 'all' },
        { label: 'Fait', value: 'done' },
        { label: 'Non fait', value: 'not_done' },
        { label: 'Check all', value: 'check_all' }
    ]);

    useEffect(() => {
      const fetchTodos = async () => {
          try {
              const todosFromApi = await getTodos(todoListId, token);
              setTodos(todosFromApi);
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
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        setNewTextToDo('');
      } catch (error) {
        console.error('Error adding todo:', error.message);
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
          const updatedTodo = await updateTodo(id, done, token);
          if (updatedTodo) {
              const updatedTodos = todos.map(item =>
                  item.id === id ? { ...item, content: newContent, done } : item
              );
              setTodos(updatedTodos);
          } else {
              console.log('Error updating item.');
          }
      } catch (error) {
          console.log('Error updating item:', error.message);
      }
    };

    const applyFilter = () => {
      if (selectedFilter === 'check_all') {
          setTodos(todos.map(item => ({ ...item, done: true })));
      } else {
          setFilter(selectedFilter);
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
          
          <View style={styles.dropdownContainer}>
              <DropDownPicker
                  open={open}
                  value={selectedFilter}
                  items={items}
                  setOpen={setOpen}
                  setValue={setSelectedFilter}
                  setItems={setItems}
                  containerStyle={styles.dropdown}
              />
              <Button title="Valider" onPress={applyFilter} />
          </View>

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

          <FlatList
              style={{ paddingLeft: 10 }}
              data={filteredTodos}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <TodoItem item={item} deleteItem={deleteItem} editItem={editItem} />}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
  },
  dropdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
  },
  dropdown: {
      width: '70%',
      marginRight: 8,
  },
  textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 8,
      marginBottom: 16,
  },
  button: {
      marginBottom: 16,
  }
});

