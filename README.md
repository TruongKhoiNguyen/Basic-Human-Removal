# Human Removal

This is a program used to remove human from a video using bodyPix pre-trained model and Tensorflow.js

## Technologies

- Standard web technologies (HTML, CSS, JavaScript)
- Tensorflow.js

## How does it work

BodyPix is a pre-trained model that can detect human in an image. By using this model, this program can detect "human area" in a video frame and using the background from previous frame to fill in the "human area", make human invisible. How ever, because no generative network is used, this program is not suitable for any videos that do not have static background or having too much people in frame.

## Things I want to implement in the future

- Make proper user interface
- Add a generative model  
