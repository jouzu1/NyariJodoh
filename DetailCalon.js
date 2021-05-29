import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler'

export class DetailCalon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props,
            image: this.props.route.params.image
        }
    }
    componentDidMount() {
        console.log('ini data did mount', this.state.data)
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>Detail Calon</Text>
                    <Image source={{ uri: `http://06ed236bd667.ngrok.io/user/image/${this.state.image}` }} style={styles.image, { height: 400 }} />
                    <View>
                        <Text>Nama            : {this.state.data.route.params.name}</Text>
                        <Text>Umur            : {this.state.data.route.params.umur}</Text>
                        <Text>Username        : {this.state.data.route.params.username}</Text>
                        <Text>Nomor Handphone : {this.state.data.route.params.nomorhp}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop:40
    },
    item: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // flexDirection:'row'
    },
    title: {
        fontSize: 32,
    },
    image: {
        // width:50,
        flex: 1,
        height: 50
    }
});

export default DetailCalon
