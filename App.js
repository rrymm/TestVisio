import React, { useEffect, useState } from 'react';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import { fetchVisioInformations, fetchRoomAndJwtFromCode, DEFAULT_VISIO_URL } from './utils';
import urlJoin from 'url-join';
import DialogInput from 'react-native-dialog-input';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { useIntl } from 'react-intl';

function App() {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [urlVisio, setUrlVisio] = useState(DEFAULT_VISIO_URL);
  const { formatMessage: f } = useIntl();

  const submitCode = (code) => {
    setDialogVisible(false);
    fetchRoomAndJwtFromCode(code)
    .then(({room, jwt}) => {
      setTimeout(() => {
        JitsiMeet.call(urlJoin(urlVisio, room, `?jwt=${jwt}`), {});
      }, 500);
    })
    .catch(err => {
      console.log(err);
      showMessage({
        message: f({id: 'errorNoRoomForCode'}, { code }),
        type: "warning"
      });
      setTimeout(() => {
        hideMessage();
        setDialogVisible(true);
      }, 6000);
    })
  }

  const cancelDialog = () => setDialogVisible(false);

  useEffect(() => {
    fetchVisioInformations()
    .then(url => {
      setUrlVisio(url);
      setDialogVisible(true);
    })
  }, []);

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });
  return (
    <>
      <JitsiMeetView
        onConferenceTerminated={() => setDialogVisible(true)}
        onConferenceJoined={() => {}}
        onConferenceWillJoin={() => {}}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
      />
      <DialogInput
        isDialogVisible={isDialogVisible}
        title={f({id: 'titleAskRoom'})}
        message={f({id: 'descriptionAskRoom'})}
        hintInput={f({id: 'hintCode'})}
        submitInput={submitCode}
        closeDialog={cancelDialog}
        textInputProps={{
          keyboardType: 'numeric'
        }}
        cancelText={f({id: 'cancel'})}
        submitText={f({id: 'validate'})} />
        <FlashMessage duration={6000} onPress={() => setDialogVisible(true)} position="bottom" />
    </>
  )
}
export default App;