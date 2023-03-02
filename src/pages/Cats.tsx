import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
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

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderMove: (evt, gestureState) => {
  //       position.setValue({x: gestureState.dx, y: gestureState.dy});
  //       if (gestureState.dx > 120) {
  //         setSwipeDirection('right');
  //       } else if (gestureState.dx < -120) {
  //         setSwipeDirection('left');
  //       } else {
  //         setSwipeDirection(null);
  //       }
  //     },
  //     onPanResponderRelease: (evt, gestureState) => {
  //       if (gestureState.dx > 120) {
  //         voteCat(1); // Vote yes if swiped right
  //         setLikedImages([...likedImages, catImage.id]); // Add image id to liked images
  //         setSwipeDirection(null);
  //       } else if (gestureState.dx < -120) {
  //         voteCat(0); // Vote no if swiped left
  //         setDislikedImages([...dislikedImages, catImage.id]); // Add image id to disliked images
  //         setSwipeDirection(null);
  //       } else {
  //         Animated.spring(position, {
  //           toValue: {x: 0, y: 0},
  //           useNativeDriver: true,
  //         }).start();
  //       }
  //     },
  //   }),
  // ).current;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Fire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Superlike</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: catImage.url}} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.likeButton]}
          onPress={() => voteCat(1)}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.dislikeButton]}
          onPress={() => voteCat(0)}>
          <Text style={styles.buttonText}>Dislike</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    resizeMode: 'cover',
    borderRadius: 20,
  },
  likeButton: {
    backgroundColor: '#27ae60',
  },
  dislikeButton: {
    backgroundColor: '#c0392b',
  },
});

export default Cats;
