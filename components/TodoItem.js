import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { TrashIcon, PencilIcon, CheckIcon, PhotoIcon } from "react-native-heroicons/solid";
import {launchImageLibrary} from 'react-native-image-picker';
import { Image } from 'react-native';


export default function TodoItem(props) {
    const [done, setDone] = useState(props.item.done);
    const [iconOpacity, setIconOpacity] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(props.item.content);
    const [galleryPhoto, setGalleryPhoto] = useState();

    let options = {
        saveToPhotos: true,
        mediaType: 'photo',
    };

    const openImagePicker = async () => {
        const result = await launchImageLibrary(options);
        if (result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            //console.log("Selected Image URI:", uri);
            setGalleryPhoto(uri);
        }
    };
    

    useEffect(() => {
        setDone(props.item.done);
    }, [props.item.done]);

    const toggleSwitch = async () => {
        const newDoneStatus = !done; 
        setDone(newDoneStatus); 
    
        try {
            await props.editItem(props.item.id, editedContent, newDoneStatus);
        } catch (error) {
            console.log("Error updating done status:", error.message);
            setDone(!newDoneStatus); 
        }
    };
    

    const handleIconPress = () => {
        props.deleteItem(props.item.id);
    };

    const handleEdit = () => {
        setEditMode(!editMode);
        if (editMode) {
            props.editItem(props.item.id, editedContent,done);
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
            <TouchableOpacity onPress={handleEdit} style={[styles.iconButton, styles.editIcon]}>
                {editMode ? <CheckIcon color="white" /> : <PencilIcon color="white" />}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleIconPress} style={[styles.iconButton, styles.trashIcon]}>
                <TrashIcon color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openImagePicker} style={[styles.iconButton, styles.photoIcon]}>
                <PhotoIcon color="white" />
            </TouchableOpacity>
            <Image style={styles.imageLaunch} source={{uri: galleryPhoto}}/>    
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
    imageLaunch: {
        width: 100, 
        height: 100, 
        resizeMode: 'cover',
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    editIcon: {
        backgroundColor: '#4CAF50', 
    },
    trashIcon: {
        backgroundColor: '#F44336', 
    },
    photoIcon: {
        backgroundColor: '#2196F3', 
    },
});
