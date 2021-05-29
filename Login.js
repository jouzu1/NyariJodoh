import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView } from 'react-native';
// import { BukuAction, UserAction } from '../redux/Action'
// import {UserAction, getDataUser} from './Action';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import axios from 'axios';


export class Login extends Component {
    

    constructor(props){
        super(props)
        this.state = {
            username:'',
            nomorhp:'',
            data:[]
        }
    }

    componentDidMount() {
        // this.handleGetData();
        // console.log('ini data login' , this.props.dataLogin)
        // console.log('data state',this.state.data)
    }


    componentDidUpdate() {
        this.handleGetData();
        // console.log('ini data login' , this.props.dataLogin)
        console.log('data state',this.state.data)
    }

    handleGetData(){
        axios.get(`http://a613eae18cb9.ngrok.io/user/login/`,{
            params:{
                username:this.state.username,
                nomorhp:this.state.nomorhp
            }
        })
        .then((res)=>{
            // console.log('ini data axios.get' , res.data)
            this.setState({data:res.data})
        })
    }

    nextScreen(){
        if(!this.state.data){
            alert('Email Dan Nomor Handphone Salah')
            
        }else if(this.state.data.username == this.state.username && this.state.data.nomorhp == this.state.nomorhp){
            this.props.navigation.replace('MainMenu')
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}> Login </Text>
                {/* <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Name" style={styles.input} onChangeText={(value)=>{this.props.UserAction("name",value)}}></TextInput>
                </View> */}
                <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Username" style={styles.input} onChangeText={(value)=>{this.setState({username:value})}}></TextInput>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Phone" style={styles.input} keyboardType = 'numeric' onChangeText={(value)=>{this.setState({nomorhp:value})}}></TextInput>
                </View>
                {/* <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Address" style={styles.input} onChangeText={(value)=>{this.props.UserAction("address",value)}}></TextInput>
                </View> */}
                <View style={{flexDirection:'row'}}>
                    <Button title='Cancel' onPress={()=>{this.props.navigation.replace('Home')}}></Button>
                    <Button title='Submit' onPress={()=>{this.nextScreen()}}></Button>
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection:"row",
        // justifyContent: 'center',
        alignItems: 'center',
        // justifyContent:'space-between'
    },
    button: {
        padding: 10,
        // width: 200,
        // flexDirection:"row",
    },
    text: {
        marginTop:50,
        textAlign: 'center',
        // borderWidth: 5,
        fontSize: 40,
        fontWeight: "bold",
        // justifyContent:'space-between'
    },
    image: {
        width: 200,
        height: 200
    },
    input: {
        borderWidth: 2,
        // width: 500,
        flex: 1, 
        marginTop:50
        // flexWrap: 'wrap'
    }
});

export default Login