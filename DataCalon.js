import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export class DataCalon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jeniskelamin: this.props.route.params,
            data: [],
            image: ''
        };
    }
    componentDidMount() {
        console.log('jenis kelamin data calon', this.state.jeniskelamin)
        this.handleGetData()
    }

    handleGetData() {
        axios.get(`http://06ed236bd667.ngrok.io/user/`)
            .then((response) => {
                console.log('ini getData', response.data)
                this.setState({ data: response.data, image: response.data.image })
            }).catch((err) => {
                console.log(err)
            })
    }
    renderItem = ({ item }) => {
        return(
        <View >
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                {this.state.jeniskelamin == 'male' ?
                    (item.jeniskelamin == 'female' ?
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('DetailCalon', item) }} style={styles.item}>
                            <View>
                                <Text>Nama : {item.name}</Text>
                                <Text>Umur : {item.umur}</Text>
                                <Text>Username : {item.username}</Text>
                                {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
                            </View>
                            <View>
                                <Image source={{uri:`http://06ed236bd667.ngrok.io/user/image/${item.image}`}} style={styles.image} />
                            </View>
                        </TouchableOpacity>
                        :
                        // <Text style={{ fontSize: 25, alignSelf: 'center', marginLeft: 40 }}>DATA CALON</Text>
                        null
                    )
                    :
                    (item.jeniskelamin == 'male' ?
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('DetailCalon', item) }} style={styles.item}>
                            <View>
                                <Text>Nama : {item.name}</Text>
                                <Text>Umur : {item.umur}</Text>
                                <Text>Username : {item.username}</Text>
                                {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
                            </View>
                            <View>
                                <Image source={{uri:`http://06ed236bd667.ngrok.io/user/image/${item.image}`}} style={styles.image} />
                            </View>
                        </TouchableOpacity>
                        :
                        // <Text style={{ fontSize: 25, alignSelf: 'center', marginLeft: 40 }}>DATA CALON</Text>
                        null
                    )
                }
            </View>
            <View>
                {/* <Image source={{ uri: `http://06ed236bd667.ngrok.io/user/image/${item.image}` }} style={styles.image} /> */}
            </View>
        </View>
    )};
    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
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
        justifyContent: "space-between"
        // flexDirection:'row'
    },
    title: {
        fontSize: 32,
    },
    image:{
        width:50,
        height:50
    }
});

export default DataCalon
