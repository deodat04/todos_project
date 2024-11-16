import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ bgcolor, completedTasks = 0, totalTasks = 0 }) => {
  const completedPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  console.log(`ProgressBar props: Completed ${completedTasks}, Total ${totalTasks}`);

  return (
    <View style={styles.container}>
      <View style={[styles.filler, { width: `${completedPercentage}%`, backgroundColor: bgcolor }]} />
      <Text style={styles.label}>{`${completedTasks} sur ${totalTasks} tâches completées`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginVertical: 10
  },
  filler: {
    height: '100%',
    borderRadius: 50,
  },
  label: {
    position: 'absolute',
    top: 2,
    left: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  }
});

export default ProgressBar;
