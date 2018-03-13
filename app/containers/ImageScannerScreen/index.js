import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    Alert
} from 'react-native';


import styles from './style';
import PhotoUpload from 'react-native-photo-upload';
import RNTesseractOcr from 'react-native-tesseract-ocr';

const tessOptions = {
    whitelist: null,
    blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
};

export default class ImageScannerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false,
                        ocrResult: null 
                     };
    }

    doOcr(path) {
        RNTesseractOcr.recognize(path, 'LANG_ENGLISH', tessOptions)
            .then((result) => {
                this.setState({ ocrResult: result });
                // console.log('OCR Result: ', result);
            })
            .catch((err) => {
                console.log('OCR Error: ', err);
            })
            .done();
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#ccc' }}>ImageScannerScreen</Text>
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        if (avatar) {
                            console.log('Image base64 string: ', avatar)
                        }
                    }}

                    onResponse={response => {
                        if (response) {
                            this.doOcr(response.path);
                        }
                    }}
                >
                    <Image
                        style={{
                            paddingVertical: 30,
                            width: 150,
                            height: 150,
                            borderRadius: 75
                        }}
                        resizeMode='cover'
                        source={{
                            uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                        }}
                    />
                </PhotoUpload>

                <Text style={{ color: '#ccc' }}>{this.state.ocrResult}</Text>

            </View>
        );
    }
}