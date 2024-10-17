import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListsScreen from "../Screen/TodoListsScreen";
import TodoItemScreen from "../Screen/TodoItemScreen";

import React from "react";

const Stack = createNativeStackNavigator();


export default function NavigationToDo () {
    return (
        <Stack.Navigator initialRouteName='List'>
          <Stack.Screen name='List' component={TodoListsScreen} />
          <Stack.Screen name='Items' component={TodoItemScreen} />
        </Stack.Navigator>  
    )
  }