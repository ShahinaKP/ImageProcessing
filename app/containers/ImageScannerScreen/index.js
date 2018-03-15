import React, { Component } from 'react';
import {
    ActivityIndicator,
    Text,
    Image,
    View,
    Alert,
    Dimensions
} from 'react-native';


import styles from './style';
import PhotoUpload from 'react-native-photo-upload';
import RNTesseractOcr from 'react-native-tesseract-ocr';

const tessOptions = {
    whitelist: null,
    blacklist: '!"#$%&/()={}[]+*-_:;<>'
};

export default class ImageScannerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            ocrResultName: '',
            ocrResultNum: '',
            screenWidth: Dimensions.get('window').width
        };
    }

    doOcr(path) {
        RNTesseractOcr.recognize(path, 'LANG_ENGLISH', tessOptions)
            .then((result) => {
                var str1 = `Name: Shahina\n Licence No:1212121212`;
                this.getNameAndNum(result);                
            })
            .catch((err) => {
                console.log('OCR Error: ', err);
            })
            .done();
    }

    getNameAndNum = (data) => {
        let dataLines = data.split('\n');
        let nameArr = this.searchStringInArray('Name',dataLines)
        let numArr = this.searchStringInArray('Licence No',dataLines)

        if(nameArr !== -1) {
            let nameArrStrs = nameArr.split('Name');
            this.setState({ ocrResultName: 'Name: '+nameArrStrs[1].slice(2)});
        }
        else {
            this.setState({ ocrResultName: 'No data available',isLoading: false});
        }
        
        if(numArr !== -1) {
            let numArrStrs = numArr.split('Licence No');
            this.setState({ ocrResultNum: 'Licence No: '+numArrStrs[1].slice(2)},
                            () =>{
                                this.setState({isLoading: false})
                        });
        }
        else {
            this.setState({ ocrResultNum: '',isLoading: false});
        }
    }

    searchStringInArray = (str, strArray) => {
        for (var j=0; j<strArray.length; j++) {
            if (strArray[j].match(str)) return strArray[j];
        }
        return -1;
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Upload your image here and get the details</Text>
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        if (avatar) {
                            console.log('Image base64 string: ', avatar)
                        }
                    }}

                    onResponse={response => {
                        if (response) {
                            this.setState({isLoading: true});
                            this.doOcr(response.path);
                        }
                    }}
                    
                    onCancel= {event => {
                        this.setState({isLoading: false});
                    }}
                >
                    <Image
                        style={[{width: this.state.screenWidth},styles.imageHolder]}                       
                        resizeMode='contain'
                        source={require('../../images/img-placeholder.png')}
                    />
                </PhotoUpload>

                {(this.state.isLoading) ?
                    <ActivityIndicator
                        animating={this.state.isLoading}
                        color = '#ccc'
                        size="large"
                        style = {styles.activityIndicator}
                    />
                    :
                    null
                }

                <Text style={styles.imageData}>{this.state.ocrResultName}</Text>
                <Text style={styles.imageData}>{this.state.ocrResultNum}</Text>

            </View>
        );
    }
}