import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { TrashIcon, PencilIcon, CheckIcon } from "react-native-heroicons/solid";

export default function TodoItem(props) {
    const [done, setIsEnabled] = useState(props.item.done);
    const [iconOpacity, setIconOpacity] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(props.item.content);

    useEffect(() => {
        setIsEnabled(props.item.done);
    }, [props.item.done]);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const handleIconPress = () => {
        props.deleteItem(props.item.id);
    };

    const handleEdit = () => {
        setEditMode(!editMode);
        if (editMode) {
            props.editItem(props.item.id, editedContent);
        }
    };

    return (
        <View style={styles.content}>
            {editMode ? (
                <TextInput
                    style={styles.editInput}
                    value={editedContent}
                    onChangeText={setEditedContent}
                />
            ) : (
                <Text style={[styles.textItem, { textDecorationLine: done ? 'line-through' : 'none' }]}>
                    {props.item.content}
                </Text>
            )}
            <Switch
                style={styles.switch}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={done ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={done}
            />
            <TouchableOpacity onPress={handleEdit}>
                {editMode ? <CheckIcon /> : <PencilIcon />}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleIconPress} style={{ opacity: iconOpacity }}>
                <TrashIcon />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    editInput: {
        flex: 1,
        fontSize: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    switch: {
        margin: 10,
    },
});
