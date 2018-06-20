const path = require('path');

const paths = {
    data: path.join(__dirname, './data'),
    raw: path.join(__dirname, './data/raw'),
    faces: path.join(__dirname, './data/faces')
};

module.exports = {
    path: paths
};