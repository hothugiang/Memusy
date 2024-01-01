import { Dimensions, TextInput, Alert } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, FlatList } from 'react-native';
import { axiosInstance } from '../constants/Axios';
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
import playlist from "../../assets/img/playlist.png";
import { Button, Icon } from "react-native-elements"
import Modal from "react-native-modal";

const ListPlaylist = ({ navigation, route }) => {
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const toggleModalCreate = () => {
        setCreateModalVisible(!isCreateModalVisible);
    };

    const handleDeletePlaylist = (playlistId) => {
        const updatedPlaylists = playlists.filter(item => item.playlist_id !== playlistId);
        setPlaylists(updatedPlaylists);
        //dnhn gọi API delete dưới ni cx đc nè =))
    };
    

    const [playlists, setPlaylists] = useState([
        {
            "playlist_id": 1,
            "name": "Playlist 1",
            "user_id": 1
        },
        {
            "playlist_id": 2,
            "name": "Tôi yêu vãi lồn",
            "user_id": 1
        },
        {
            "playlist_id": 3,
            "name": "Tôi Yêu Việt Nam",
            "user_id": 1
        },
        {
            "playlist_id": 4,
            "name": "Playlist 1",
            "user_id": 1
        },
        {
            "playlist_id": 5,
            "name": "Tôi yêu vãi lồn",
            "user_id": 1
        },
        {
            "playlist_id": 6,
            "name": "Tôi Yêu Việt Nam",
            "user_id": 1
        },
        {
            "playlist_id": 7,
            "name": "Playlist 1",
            "user_id": 1
        },
        {
            "playlist_id": 8,
            "name": "Tôi yêu vãi lồn",
            "user_id": 1
        },
        {
            "playlist_id": 9,
            "name": "Tôi Yêu Việt Nam",
            "user_id": 1
        },
        {
            "playlist_id": 10,
            "name": "Playlist 1",
            "user_id": 1
        },
        {
            "playlist_id": 11,
            "name": "Tôi yêu vãi lồn",
            "user_id": 1
        },
        {
            "playlist_id": 12,
            "name": "Tôi Yêu Việt Nam",
            "user_id": 1
        }
    ]);

    return (
        <View style = {{backgroundColor: "black"}}>
          {/* Header */}
            <View
                style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 15,
                paddingLeft: 10,
                paddingTop: 10,
                paddingBottom: 10,
            }}>
                <TouchableOpacity>
                    <Icon
                        name="chevron-left"
                        type="font-awesome"
                        color="white"
                        size={24}
                        style={{padding: 3}}
                        onPress={() => navigation.goBack()}
                    />
                </TouchableOpacity>

                <Text
                style={{
                    fontSize: 18,
                    color: 'white',
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: "bold"
                }}>
                    Playlist
                </Text>

                <TouchableOpacity/>
            </View>

            {/* Content */}
            <View style={{height: height * 0.8}}>
                <FlatList
                    data={playlists}
                    keyExtractor={(item) => item.playlist_id.toString()}
                    renderItem={({ item }) => (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingRight: 15,
                            paddingLeft: 15,
                            paddingTop: 5,
                            paddingBottom: 5,
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate("UserPlaylistDetail")}>
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <Image source={playlist} style={{ width: 70, height: 70 }} />
                                    <Text style={{ color: "white", fontSize: 18, justifyContent: "center", marginLeft: 10 }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Thông báo", "Đã xoá playlist!");
                                    handleDeletePlaylist(item.playlist_id);
                                }}
                                style={{ alignItems: "flex-end" }}
                            >
                                <View style={{ backgroundColor: "#dd729e", padding: 5, paddingHorizontal: 10, alignItems: "center", borderRadius: 5, width: 50 }}>
                                    <Ionicons
                                        name="trash"
                                        size={22}
                                        color="white"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            {/*Footer*/}
            <View style={{alignItems: "center"}}>
                <TouchableOpacity 
                onPress={() => {
                    setCreateModalVisible(true);
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, paddingBottom: 100}}>
                    <Ionicons
                    name="add-circle-outline"
                    size={22}
                    color="white"  
                    style={{ marginRight: 5 }}  
                    />
                    <Text style={{color: "white", fontSize: 18}}>Create new playlist</Text>
                </View>
                </TouchableOpacity>
            </View>

            <Modal
                onBackdropPress={() => setCreateModalVisible(false)}
                onBackButtonPress={() => setCreateModalVisible(false)}
                isVisible={isCreateModalVisible}
                onSwipeComplete={toggleModalCreate}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={600}
                animationOutTiming={300}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={300}
                style={styles.modal}
            >
                <View style={{...styles.modalContent, minHeight: height/3, alignItems: "center"}}>
                {/* Header */}
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingRight: 15,
                        paddingLeft: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        }}>
                        <TouchableOpacity>
                        <Icon
                            name="chevron-left"
                            type="font-awesome"
                            color="white"
                            size={24}
                            style={{padding: 3}}
                            onPress={() => setCreateModalVisible(false)}
                        />
                        </TouchableOpacity>
                        <Text
                        style={{
                            fontSize: 18,
                            color: 'white',
                            flex: 1,
                            textAlign: 'center',
                            fontWeight: "bold"
                        }}>
                        Create playlist
                        </Text>
                        <TouchableOpacity/>
                    </View>

                    <View style={styles.postContent}>
                        <TextInput
                        placeholder="Nhập tên playlist"
                        placeholderTextColor="gray"
                        style={styles.textPost}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                        toggleModalCreate(); 
                        Alert.alert("Thông báo", "Đã tạo playlist mới!");
                        }} 
                    >
                        <View style={{ backgroundColor: "#dd729e", padding: 10, paddingHorizontal: 20, alignItems: "center", borderRadius: 5, marginTop: 15 }}>
                        <Text style={{ fontSize: 18 }}>Create</Text>
                        </View>
                    </TouchableOpacity>
                
                </View>
            </Modal>
        </View>
    );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "black",
        paddingTop: 10,
        borderWidth: 5,
        borderColor: "#000",
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        minHeight: height,
        paddingBottom: 20,
        justifyContent: "start",
    },

    textPost: {
        padding: 15,
        color: "white"
    },

    postContent: {
        borderWidth: 2,
        width: width * 0.85,
        borderColor: "gray",
        borderRadius: 20,
    },
})

export default ListPlaylist;

