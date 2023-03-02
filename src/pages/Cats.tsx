import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
} from 'react-native';
import axios from 'axios';

const Cats = () => {
  const [catImage, setCatImage] = useState({
    id: '2bbSbBC-v',
    url: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg',
    breeds: [
      {
        name: 'Abyssinian',
        id: '2bbSbBC-v',
      },
    ],
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
          testID="cat-image"
          style={styles.topImage}
          source={require('../assets/images/top-bar.png')}
        />
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground style={styles.image} source={{uri: catImage?.url}}>
          <View style={styles.imageTextContainer}>
            <Text style={styles.imageText}>
              {catImage?.breeds[0]?.name || catImage?.breeds[0]?.id}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => voteCat(-1)}>
          <Image
            style={styles.likeButton}
            source={require('../assets/images/unmatch-btn.png')}
            testID="unlike-button"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => voteCat(1)}>
          <Image
            style={styles.likeButton}
            source={require('../assets/images/match-btn.png')}
            testID="like-button"
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
  imageTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageText: {
    color: '#000000',
    fontStyle: 'normal',
    textAlign: 'center',
    padding: 10,
    width: '80%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
