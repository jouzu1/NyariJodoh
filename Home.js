import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Button } from 'react-native'

export class Home extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        
                        <Image source={{ uri: 'https://download.logo.wine/logo/Tinder_(app)/Tinder_(app)-Flame-Logo.wine.png' }} style={styles.image} />
                    </View>
                    <Text style={{  justifyContent: 'center', alignItems:'center', alignSelf: 'center', fontSize:35}}>Nyari Jodoh</Text>
                    <Button title='Login' style={styles.button} onPress={() => { this.props.navigation.replace('Login') }}>Login</Button>
                    <Button title='Register' style={styles.button} onPress={() => { this.props.navigation.replace('Register') }}></Button>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        width: 200,
    },
    text: {
        textAlign: 'center',
        borderWidth: 5,
    },
    image: {
        // backgroundColor:'rgba(255,0,0,0.5)',
        width: 200,
        height: 200
    }
});

export default Home
