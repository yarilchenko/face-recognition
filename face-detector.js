const fr = require('face-recognition'),
    detector = fr.FaceDetector(),
    moment = require('moment'),
    defaultSize = 150;

const faceDetector = ({images = [], storePath = null, size = defaultSize}) => {
    if (!storePath) {
        throw new Error(`Please specify path where need to store images`);
    }

    images.forEach((imagePath) => {
        const image = fr.loadImage(imagePath);
        const faceImages = detector.detectFaces(image, size);
        faceImages.forEach((face, i) => {
            return fr.saveImage(`${storePath}/face_${+(new Date())}.png`, face);
        });
    });

};

module.exports = faceDetector;