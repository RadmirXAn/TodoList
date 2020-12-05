import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

class Logotype extends Component{
    render() {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.rectangle}>■</Text>
                <Text style={styles.circle}>●</Text>
                <Text style={styles.triangle}>▼</Text>
            </View>
        );
      }
}

const styles = StyleSheet.create({
    rectangle: {
      fontWeight: "bold",
      fontSize: 20,
    },
    circle: {
        fontWeight: "bold",
        fontSize: 29,
        paddingBottom: 1,
        paddingRight: 7,
        paddingLeft: 7,
      },
    triangle: {
        fontWeight: "bold",
        fontSize: 15,
        paddingTop: 1,
    },
  });

export default Logotype;