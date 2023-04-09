
import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, LayoutAnimation,Alert, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // import the FontAwesome icon library
import { Clipboard } from 'react-native';
import { Linking } from 'react-native';
import LottieView from 'lottie-react-native';
import Circles from "../../Data/Circles.js";
import { FontAwesome5 } from "react-native-vector-icons";
import * as Font from 'expo-font';



const ViewComplaints = ({ navigation }) => {
    const [complaints, setComplaints] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [itemDetailsHeight, setItemDetailsHeight] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshingAnimation, setRefreshingAnimation] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const [complaintsPerPage, setComplaintsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/Fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../../assets/Fonts/Poppins-Bold.ttf"),
      });
    }

    loadFonts();
  }, []);

    useEffect(() => {
        navigation.setOptions({
          title: "View Complains", // Set Header Title
          headerTintColor: "darkblue", // Set font color of navigation bar
          headerStyle: {
            backgroundColor: "white", // Set background color of navigation bar
          },
          headerTitleStyle: {
            fontWeight: "bold", // Set font weight of navigation bar
            fontFamily: "Poppins-Bold", // Set font family of navigation bar
            fontSize: 25,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <FontAwesome5
                name="home"
                size={25}
                color="darkblue"
                style={styles.Home_icon}
              />
            </TouchableOpacity>
          ),
        });
      }, [navigation]);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setDateTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      fetch(`http://192.168.8.141:4000/api/data?page=${currentPage}&limit=${complaintsPerPage}`)
        .then((response) => response.json())
        .then((data) => {
          // sort the data by date and reverse the array
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setComplaints(data);
        })
        .catch((error) => console.error(error));
    }, [currentPage, complaintsPerPage]);
  
    const toggleComplaintDetails = (id) => {
      LayoutAnimation.easeInEaseOut();
      setExpanded((prevExpanded) => ({ ...prevExpanded, [id]: !prevExpanded[id] }));
      // update the height of the itemDetails view
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const height = expanded[id] ? 0 : 'auto';
      setItemDetailsHeight((prevItemDetailsHeight) => ({ ...prevItemDetailsHeight, [id]: height }));
    };
  
    const handleCopy = (item) => {
      const complaintDetails = `Name: ${item.name}\nEmail: ${item.email}\nComplain Type: ${item.complainType}\nComplain: ${item.complain}\nCreated At: ${item.createdAt}`;
      Clipboard.setString(complaintDetails);
      Alert.alert('Success', 'Complaint details copied to clipboard');
    };
  
    const handleCopyId = (id) => {
      Clipboard.setString(id);
      Alert.alert('ID Copied', `ID: ${id} has been copied to clipboard`);
    };
  
  const handleRefresh = () => {
    setLoading(true);
    fetch('http://192.168.8.141:4000/api/data')
      .then(response => response.json())
      .then(data => {
        // sort the data by date and reverse the array
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComplaints(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };
  
  


  const handleDelete = (id) => {
    Alert.alert(
      'Delete Complaint',
      'Are you sure you want to delete this complaint?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            fetch(`http://192.168.8.141:4000/api/data/${id}`, { method: 'DELETE' })
              .then(response => response.json())
              .then(data => {
                setComplaints(complaints.filter(complaint => complaint._id !== id));
                Alert.alert('Success', 'Complaint deleted successfully');
              })
              .catch(error => console.error(error));
          },
          style: 'destructive',
        },
      ]
    );
  };


    const startIndex = (currentPage - 1) * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    const displayedComplaints = complaints.slice(startIndex, endIndex);

    const filteredComplaints = displayedComplaints.filter(
    complaint => complaint._id.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );



  const renderItem = ({ item }) => {
    const isExpanded = expanded[item._id];
    const height = itemDetailsHeight[item._id] || 0;
    const itemDetailsHeightStyle = { height };
    if (!displayedComplaints.includes(item)) {
        return null;
      }
      
    return (
      <View style={styles.itemContainer}>
        
        <View style={styles.itemHeader}>
         <TouchableOpacity onPress={() => toggleComplaintDetails(item._id)} onLongPress={() => handleCopyId(item._id)}>
             <Text style={styles.itemTitle}>ID: {item._id}</Text>
            </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDelete(item._id)}>
            <FontAwesome name="trash" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCopy(item)}>
            <FontAwesome name="copy" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.itemDetails, itemDetailsHeightStyle]}>
        <Text style={styles.itemDescription}>ID: {item.id}</Text>
          <Text style={styles.itemDescription}>Name: {item.name}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.email}`)}>
            <Text style={styles.itemDescription}>Email: {item.email}</Text>
          </TouchableOpacity>
          <Text style={styles.itemDescription}>Complain Type: {item.complainType}</Text>
          <Text style={styles.itemDescription}>Complain: {item.complain}</Text>
          <Text style={styles.itemDescription}>Created At: {item.createdAt}</Text>
          {item.image ? (
            <Image
              style={styles.itemImage}
              source={{ uri: `http://192.168.8.141:4000/uploads/${item.image}` }}
              resizeMode='contain'
              defaultSource={require('../../assets/logo.png')}
            />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>No Image Available</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  
return (

<View style={styles.container}>
<Circles />
<Text style={styles.title}>Complaints List</Text>
<View style={styles.dateTimeContainer}>
        <Text style={styles.dateTime}>{dateTime.toLocaleString()}</Text>
      </View>
<View style={styles.searchInput}>
  <FontAwesome name="search" size={18} color="#6e6e6e" style={styles.searchIcon} />
  <TextInput
    style={styles.searchTextInput}
    placeholder="Search by ID"
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
</View>
<TouchableOpacity onPress={handleRefresh} style={styles.refreshIcon}>
  <FontAwesome name="refresh" size={24} color={refreshing ? "#b3b3b3" : "black"} />
  <Text fontSize color={refreshing ? "white" : "White"} >Refresh</Text>
</TouchableOpacity>

<FlatList
  data={filteredComplaints}
  renderItem={renderItem}
  keyExtractor={item => item._id}
  extraData={expanded}
  refreshing={refreshing}
  onRefresh={handleRefresh}
/>
<>
<View style={styles.loadMoreContainer}>
    {currentPage > 1 && (
      <TouchableOpacity
        style={styles.loadMoreButton}
        onPress={() => setCurrentPage(currentPage - 1)}
      >
        <FontAwesome name="arrow-circle-up" size={32} color="black" />
      </TouchableOpacity>
    )}

    {complaints.length > endIndex && (
      <TouchableOpacity
        style={styles.loadMoreButton}
        onPress={() => setCurrentPage(currentPage + 1)}
      >
        <FontAwesome name="arrow-circle-down" size={32} color="black" />
      </TouchableOpacity>
    )}
 </View>
  </>

</View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eef2f9',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#1a2a3a',
    },
    itemContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#4d4d4d',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f0f8ff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      
      
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      color: '#1a2a3a',
    },
    itemDetails: {
      overflow: 'hidden',
      marginTop: 10,
      
    },
    itemDescription: {
      fontSize: 16,
      marginBottom: 5,
      color: '#1a2a3a',
    },
    itemImage: {
      width: '100%',
      height: 200,
      marginTop: 10,
    },
    noImageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 200,
      borderWidth: 1,
      borderColor: '#ccc',
      marginTop: 10,
    },
    noImageText: {
      fontSize: 16,
      color: '#1a2a3a',
    },
    searchInput: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      borderWidth: 1,
      borderColor: '#ced6e0',
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    searchIcon: {
      marginRight: 10,
      color: '#1a2a3a',
    },
    searchTextInput: {
      flex: 1,
      height: 40,
      borderWidth: 0,
      paddingLeft: 0,
      color: '#1a2a3a',
    },
      loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999,
      },
      refreshIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
      },
      refreshAnimation: {
        width: 24,
        height: 24,
        marginHorizontal: 10,
      },
      dateTimeContainer: {
        position: 'absolute',
        top: 10,
        left: 20,
      },
      dateTime: {
        fontSize: 12,
        color: 'darkblue',
      },
      loadMoreContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
        right: 20,
        elevation: 5,
        
      },
      loadMoreButton: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      loadMoreButtonIcon: {
        fontSize: 24,
      },
      
      
  });
  
  

export default ViewComplaints;
