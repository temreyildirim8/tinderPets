import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';

const Cats = () => {
  const [catImage, setCatImage] = useState({
    id: '2bbSbBC-v',
    url: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg',
  });

  useEffect(() => {
    fetchCatImage();
  }, []);

  const fetchCatImage = async () => {
    try {
      const response = await axios.get(
        'https://api.thecatapi.com/v1/images/search?api_key=live_PObtf0cErjNokIYUcUmTg7Yl7NXlXFw3R5RolGPlNlzKN21f8ZEIr0YXyYjJ4xDY',
      );
      setCatImage(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const voteCat = async (vote: number) => {
    try {
      const response = await axios.post(
        'https://api.thecatapi.com/v1/votes?api_key=live_PObtf0cErjNokIYUcUmTg7Yl7NXlXFw3R5RolGPlNlzKN21f8ZEIr0YXyYjJ4xDY',
        {
          image_id: catImage.id,
          value: vote,
        },
      );
      console.log(response.data);
      fetchCatImage();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          style={styles.topImage}
          source={require('../assets/images/top-bar.png')}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: catImage.url}} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => voteCat(-1)}>
          <Image
            style={styles.likeButton}
            source={require('../assets/images/unmatch-btn.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => voteCat(1)}>
          <Image
            style={styles.likeButton}
            source={require('../assets/images/match-btn.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity>
          <Image source={require('../assets/images/nav-bar.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  topImage: {
    width: 84,
    height: 28,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  likeButton: {
    width: 55,
    height: 55,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Cats;
