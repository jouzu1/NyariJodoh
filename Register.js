import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Platform, Button, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: "",
            jeniskelamin: '',
            nomorhp: '',
            umur: '',
            kejadian: "",
            alamat: "",
            keterangan: "",
            image: "https://cdn.iconscout.com/icon/free/png-512/gallery-187-902099.png",
            latitude: "",
            longitude: "",
            hasPermission: null,
            cameraType: Camera.Constants.Type.back,
            // cameraRef:null,
            // type:Camera.Constants.Type.back
        }
        this.cameraRef = React.createRef();
    }

    componentDidMount() {
        this.getPermission()
        this.getLocation()
        this.kamera();
        // this.openCamera();
    }

    componentDidUpdate() {
        // this.openCamera();
    }

    // kamera = async() =>{
    //     const { status } = await Camera.requestPermissionsAsync();
    //     this.setState({hasPermission: status === 'granted'})
    //     // setHasPermission(status === 'granted');
    // }
    kamera = async () => {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }
    async getPermission() {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    handleCameraType = () => {
        const { cameraType } = this.state

        this.setState({
            cameraType:
                cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })
    }

    takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log('ini foto', photo)
            this.setState({ image: photo.uri })

        }
    }
    async pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            console.log("ini hasil dari galeri", result.uri)
            this.setState({ image: result.uri })
        }
    }

    async getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log("Lokasinya adalah :" + JSON.stringify(location));

        this.setState({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })
    };

    handlerSubmit() {

        let formData = new FormData();
        let filename = this.state.image;
        console.log("nama gambar " + filename.split('/').pop())
        formData.append('data', JSON.stringify(this.state))
        formData.append('file', {
            uri: this.state.image, //Your Image File Path
            type: 'image/jpeg',
            name: filename.split('/').pop(),
        })
        // formData.append('name',this.state.name);
        // formData.append('kejadian',this.state.kejadian);
        // formData.append('keterangan',this.state.keterangan);
        // formData.append('alamat',this.state.alamat);
        // formData.append('image',this.state.image);
        // formData.append('latitude',this.state.latitude);
        // formData.append('longitude',this.state.longitude);
        // formData.append('status',this.state.status);
        // formData.append('jam',this.state.jam);
        axios.post('http://06ed236bd667.ngrok.io/user/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                alert(response.data)
                this.props.navigation.replace("Login")
            })
            .catch((error) => {
                console.log(error)
            })
    }


    // openCamera = async () => {
    //     // Ask the user for the permission to access the camera
    //     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    //     if (permissionResult.granted === false) {
    //         alert("You've refused to allow this appp to access your camera!");
    //         return;
    //     }

    //     const result = await ImagePicker.launchCameraAsync();

    //     // Explore the result
    //     console.log("ini foto kamera ", result);

    //     if (!result.cancelled) {
    //         this.setState({ image: result.uri })
    //         console.log("ini foto kamera ", result.uri);
    //     }
    // }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView >
                    <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 40, fontWeight: 'bold' }}> Registrasi </Text>
                    <Text>Username</Text>
                    <TextInput style={{ borderWidth: 1 }} placeholder='Username Anda' onChangeText={(value) => { this.setState({ username: value }) }} />
                    <Text>Nama</Text>
                    <TextInput style={{ borderWidth: 1 }} placeholder='Nama Anda' onChangeText={(value) => { this.setState({ name: value }) }} />
                    <Text> Jenis Kelamin </Text>
                    <Picker
                        selectedValue={this.state.jeniskelamin}
                        style={{ height: 50, width: 300 }}
                        onValueChange={(itemValue) => this.setState({ jeniskelamin: itemValue })}>
                        <Picker.Item label="Masukan Pilihan" />
                        <Picker.Item label="Laki - Laki" value="male" />
                        <Picker.Item label="Perempuan" value="female" />
                    </Picker>

                    <Text> Nomor Handphone </Text>
                    <TextInput style={{ borderWidth: 1 }} placeholder="Nomor Handphone" keyboardType='numeric' onChangeText={(value) => { this.setState({ nomorhp: value }) }} />
                    <Text> Umur </Text>
                    <TextInput style={{ borderWidth: 1 }} placeholder='Umur Anda' keyboardType='numeric' onChangeText={(value) => { this.setState({ umur: value }) }} />

                    <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                    <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', }}>
                        <Button title="Galery" onPress={() => { this.pickImage() }} />
                    </View>
                    {/* <View style={{ flex: 1, alignSelf: 'flex-start', flexDirection: "row" }}> */}
                    <Camera style={{ height: 500}} type={this.state.cameraType} ref={ref => { this.camera = ref }}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                            }}
                            onPress={() => this.takePicture()}
                        >
                            <FontAwesome
                                name="camera"
                                style={{ color: "#fff", fontSize: 40 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                            }}
                            onPress={() => this.handleCameraType()}
                        >
                            <MaterialCommunityIcons
                                name="camera-switch"
                                style={{ color: "#fff", fontSize: 40 }}
                            />
                        </TouchableOpacity>
                        </View>
                    </Camera>
                    {/* </View> */}
                    <Button title='Cancel' onPress={()=>{this.props.navigation.replace('Home')}}></Button>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.handlerSubmit() }}><Text style={styles.textStyle}>Tambah Laporan</Text></TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default Register

const styles = StyleSheet.create({
    margin: {
        marginTop: 50
    },
    container: {
        flex: 1,
    },
    viewStyle: {
        margin: 20,
    },

    buttonStyle: {
        borderWidth: 10,
        borderColor: "red",
        margin: 20
    },

    textStyle: {
        textAlign: 'center',
        // borderWidth:1
    }


})