import React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TrashIcon, PencilIcon, CheckIcon } from "react-native-heroicons/solid";
import { ProgressBar } from 'react-native-paper';
import { Share } from 'react-native';


export default function TodoList({ props }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.item.title);
    const completedTasks = todos.filter(item => item.done).length;
    const totalTasks = todos.length;
    const progress = totalTasks > 0 ? completedTasks / totalTasks : 0;
    

    const handleEdit = () => {
        setEditMode(!isEditing);
        if (isEditing) {
            props.editItem(props.item.id, editedTitle);
        }
    };

    const handleDeleteTodoList = () => {
        props.deleteItem(props.item.id);
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

      


    const renderTodoListItem = ({ item }) => (
        <View style={styles.todoItem}>
            {isEditing ? (
                <TextInput
                    style={styles.editInput}
                    value={editedTitle}
                    onChangeText={setEditedTitle}
                />
            ) : (
                <Text style={styles.todoText}>{props.item.title}</Text>
            )}

            <TouchableOpacity onPress={handleEdit}>
                {isEditing ? <CheckIcon /> : <PencilIcon />}
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDeleteTodoList}>
                <TrashIcon/>
            </TouchableOpacity>
            <ProgressBar progress={progress} color={'#4caf50'} />
            <Text>{completedTasks} of {totalTasks} tasks completed</Text>
            <TouchableOpacity onPress={shareTodoList}>
                <Text>Share List</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                keyExtractor={item => item.id.toString()}
                renderItem={renderTodoListItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    todoText: {
        fontSize: 16,
        flex: 1,
    },
    editInput: {
        flex: 1,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
});



