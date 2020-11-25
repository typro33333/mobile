import { Dialog } from 'react-native-simple-dialogs';
import React from 'react';

export default function Diaglog(props){

    return(
    <Dialog
        visible={props.open}
        title="Custom Dialog"
        onTouchOutside={() => this.setState({dialogVisible: false})} >
        <View>
            // your content here
        </View>
    </Dialog>
    )
}