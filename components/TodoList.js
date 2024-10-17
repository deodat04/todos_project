/* import React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TrashIcon, PencilIcon, CheckIcon } from "react-native-heroicons/solid";

export default function TodoList({ todos, handleDeleteTodoList, handleEditTodoList }) {
    const [isEditing, setIsEditing] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');

    const handleEdit = (id) => {
        handleEditTodoList(id, editedTitle);
        setIsEditing(null);
        setEditedTitle('');
    };

    const renderTodoListItem = ({ item }) => (
        <View style={styles.todoItem}>
            {isEditing === item.id ? (
                <TextInput
                    style={styles.editInput}
                    value={editedTitle}
                    onChangeText={setEditedTitle}
                    onSubmitEditing={() => handleEdit(item.id)}
                />
            ) : (
                <Text style={styles.todoText}>{item.title}</Text>
            )}

            <TouchableOpacity onPress={() => {
                setIsEditing(item.id);
                setEditedTitle(item.title);
            }}>
                {isEditing === item.id ? <CheckIcon /> : <PencilIcon />}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDeleteTodoList(item.id)}>
                <TrashIcon/>
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
        eimport React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TrashIcon, PencilIcon, CheckIcon } from "react-native-heroicons/solid";

export default function TodoList({ todos, handleDeleteTodoList, handleEditTodoList }) {
    const [isEditing, setIsEditing] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');

    const handleEdit = (id) => {
        handleEditTodoList(id, editedTitle);
        setIsEditing(null);
        setEditedTitle('');
    };

    const renderTodoListItem = ({ item }) => (
        <View style={styles.todoItem}>
            {isEditing === item.id ? (
                <TextInput
                    style={styles.editInput}
                    value={editedTitle}
                    onChangeText={setEditedTitle}
                    onSubmitEditing={() => handleEdit(item.id)}
                />
            ) : (
                <Text style={styles.todoText}>{item.title}</Text>
            )}

            <TouchableOpacity onPress={() => {
                setIsEditing(item.id);
                setEditedTitle(item.title);
            }}>
                {isEditing === item.id ? <CheckIcon /> : <PencilIcon />}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDeleteTodoList(item.id)}>
                <TrashIcon/>
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



levation: 2,
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
 */

import React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TrashIcon, PencilIcon, CheckIcon } from "react-native-heroicons/solid";

export default function TodoList({ props }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.item.title);

    const handleEdit = () => {
        setEditMode(!isEditing);
        if (isEditing) {
            props.editItem(props.item.id, editedTitle);
        }
    };

    const handleDeleteTodoList = () => {
        props.deleteItem(props.item.id);
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



