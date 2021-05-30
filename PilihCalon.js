import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView, FlatList, TouchableOpacity, Dimensions, Animated, Panresponder } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import axios from 'axios';

function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i
    }
}

export class PilihCalon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tampung:[],
            image: '',
            cards: [...range(1, 50)],
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0
        };
    }

    renderCard = (card, index) => {
        return (
            <View style={styles.card}>
                <Text style={styles.text}>{card} - {index}</Text>
            </View>
        )
    };

    onSwiped = (type) => {
        console.log(`on swiped ${type}`)
    }

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        })
    };

    swipeLeft = () => {
        this.swiper.swipeLeft()
    };
    componentDidMount(){
        this.handleGetData();
    }
    componentDidUpdate(){
        // this.handleGetData();
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




    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={() => this.onSwiped('right')}
                    onSwipedTop={() => this.onSwiped('top')}
                    onSwipedBottom={() => this.onSwiped('bottom')}
                    onTapCard={this.swipeLeft}
                    cards={this.state.tampung}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={80}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    stackSize={3}
                    stackSeparation={15}
                    overlayLabels={{
                        bottom: {
                            title: 'BLEAH',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                        },
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: -30
                                }
                            }
                        },
                        right: {
                            title: 'LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: 30
                                }
                            }
                        },
                        top: {
                            title: 'SUPER LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                        }
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    swipeBackCard
                >
                    <Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' />
                </Swiper>
            </View>
        )
    }
}

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
    }
})


export default PilihCalon
