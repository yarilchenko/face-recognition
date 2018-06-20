const cv = require('opencv4nodejs'),
    fr = require('face-recognition').withCv(cv),
    fs = require('fs'),
    path = require('path'),
    cam = require('livecam'),
    faceDetector = require('./face-detector'),
    recognizer = fr.FaceRecognizer(),
    config = require('./config');


(() => {
    // let rawImages = fs.readdirSync(config.path.raw)
    //         .map(imageName => path.resolve(`${config.path.raw}/${imageName}`));
    // faceDetector({images: rawImages, storePath: config.path.faces});

    /*const dataPath = path.resolve('./data/faces');
    const classNames = ['artem'];

    const allFiles = fs.readdirSync(dataPath);
    const imagesByClass = classNames.map(c =>
        allFiles
            .filter(f => f.includes(c))
            .map(f => path.join(dataPath, f))
            .map(fp => fr.loadImage(fp))
    );

    const numTrainingFaces = 10;
    const trainDataByClass = imagesByClass.map(imgs => imgs.slice(0, numTrainingFaces));
    const testDataByClass = imagesByClass.map(imgs => imgs.slice(numTrainingFaces));*/

    // trainDataByClass.forEach((faces, label) => {
    //     const name = classNames[label];
    //     recognizer.addFaces(faces, name);
    // });
    // const modelState = recognizer.serialize();
    // fs.writeFileSync('model.json', JSON.stringify(modelState));

    /*const modelState = require('./model.json');
    recognizer.load(modelState)*/


    /**
     * TODO: refactor this shit
     */
    /*const errors = classNames.map(_ => [])
    testDataByClass.forEach((faces, label) => {
        const name = classNames[label]
        console.log()
        console.log('testing %s', name)
        faces.forEach((face, i) => {
            const prediction = recognizer.predictBest(face)
            console.log('%s (%s)', prediction.className, prediction.distance)

            // count number of wrong classifications
            if (prediction.className !== name) {
                errors[label] = errors[label] + 1
            }
        })
    })

    const result = classNames.map((className, label) => {
        const numTestFaces = testDataByClass[label].length
        const numCorrect = numTestFaces - errors[label].length
        const accuracy = parseInt((numCorrect / numTestFaces) * 10000) / 100
        return `${className} ( ${accuracy}% ) : ${numCorrect} of ${numTestFaces} faces have been recognized correctly`
    })
    console.log('result:')
    console.log(result)*/

    let camera = new cv.VideoCapture(0);
    // camera.setWidth(300);
    // camera.setHeight(300);


    const server = require('./server');

    // let im = camera.read();



    server.start();
    const io = server.io;

    io.on('connection', (socket) => {

        setInterval(() => {
            let im = camera.read();
            // let imageCv = fr.CvImage(im);
            // let imageRgb = fr.cvImageToImageRGB(imageCv);
            socket.emit('frame', im.getData());
        }, 1000);

    });




    // let myDuplexStream = new DuplexStream(aReadableStream, aWritableStream);



  /*  let opts = {
        callbackReturn: "base64"
    };

    NodeWebcam.capture( "test_picture", opts, function( err, data ) {

        let image = "<img src='" + data + "'>";

    });*/
})();