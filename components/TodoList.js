import React, { useEffect, useState } from "react";
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TrashIcon, PencilIcon, CheckIcon } from "react-native-heroicons/solid";
import { Share, Platform } from 'react-native';

export default function TodoList({ item, todos = [], deleteItem, editItem, navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);


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
    if (Platform.OS === "web") {
        alert(`Ce service n'est disponible que sur une plateforme android ou ios.`);
        return;
    }

    const listContent = todos
        .map(item => `${item.content}: ${item.done ? 'Done' : 'Not done'}`)
        .join('\n');

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

        <TouchableOpacity onPress={handleEdit} style={[styles.iconButton, styles.editIcon]}>
          {isEditing ? <CheckIcon color="white" /> : <PencilIcon color="white" />}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteTodoList} style={[styles.iconButton, styles.trashIcon]}>
          <TrashIcon color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={shareTodoList}>
        <Text>Partager liste</Text>
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
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 1,
  },
  editIcon: {
    backgroundColor: '#4CAF50', 
  },
  trashIcon: {
    backgroundColor: '#F44336', 
  },
});
