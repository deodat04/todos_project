import React, { useEffect } from "react";
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { TrashIcon, PencilIcon, CheckIcon } from "react-native-heroicons/solid";
//import {launchImageLibrary} from 'react-native-image-picker';
import { useState } from 'react';

export default function TodoItem(props) {
    const [done, setIsEnabled] = useState(props.item.done);
    const [iconOpacity, setIconOpacity] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(props.item.content);
    //const [imageUri, setImageUri] = useState(null); // To store the image URI

    /* const openImagePicker = () => {
        if (Platform.OS === 'web') {
            console.log('Image picker not supported on web');
            return;
        }

        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('Image picker error: ', response.error);
          } else {
            let imageUri = response.assets?.[0]?.uri || response.uri;
            setImageUri(imageUri);  // Save the image URI
          }
        });
    }; */

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
            {/* {Platform.OS !== 'web' && (
                <>
                    <TouchableOpacity onPress={openImagePicker}>
                        <Text>Ajouter une image</Text>
                    </TouchableOpacity>
                    {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
                </>
            )} */}
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
