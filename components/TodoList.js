import React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TrashIcon, PencilIcon, CheckIcon } from "react-native-heroicons/solid";
import { Share } from 'react-native';
import ProgressBar from "./progressBar.js";

export default function TodoList({ item, todos = [], deleteItem, editItem, navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const completedTasks = todos.length > 0 ? todos.filter(item => item.done).length : 0;
  const totalTasks = todos.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      editItem(item.id, editedTitle);
    }
  };

  const handleDeleteTodoList = () => {
    deleteItem(item.id);
  };

  const shareTodoList = async () => {
    const listContent = todos.map(item => `${item.content}: ${item.done ? 'Done' : 'Not done'}`).join('\n');
    try {
      await Share.share({
        message: `Todo List:\n${listContent}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.todoItem}>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editedTitle}
            onChangeText={setEditedTitle}
          />
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Items', { todoListId: item.id, todoListName: item.title })}>
            <Text style={styles.todoText}>{item.title}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleEdit}>
          {isEditing ? <CheckIcon /> : <PencilIcon />}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteTodoList}>
          <TrashIcon />
        </TouchableOpacity>
      </View>

      <ProgressBar completedTasks={completedTasks} totalTasks={totalTasks} bgcolor="#4caf50" />

      <TouchableOpacity onPress={shareTodoList}>
        <Text>Share List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
});