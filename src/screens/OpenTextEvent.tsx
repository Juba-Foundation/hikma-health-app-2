import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useForm, SubmitHandler, FormProvider} from 'react-hook-form';
import {View, Alert, ViewStyle} from 'react-native';
import {Button} from 'react-native-paper';
import {RootStackParamList} from '../../App';
import {Screen, Text, ControlledTextField} from '../components';
import {createEvent} from '../db/api';
import {translate} from '../i18n';
import {EventTypes, Event} from '../types/Event';

type Props = NativeStackScreenProps<RootStackParamList, 'OpenTextEvent'>;

type OpenTextEvent = {
  patientId: string;
  visitId: string;
  eventType: EventTypes;
  eventMetadata: string;
};

export function OpenTextEvent(props: Props) {
  const {route, navigation} = props;
  const {eventType, patientId, visitId} = route.params;

  const {...formMethods} = useForm<OpenTextEvent>({
    defaultValues: {
      eventType: 'Complaint',
      patientId: patientId,
      visitId: visitId,
    },
  });

  const onSubmit: SubmitHandler<OpenTextEvent> = data => {
    if (data.eventMetadata.length === 0) {
      return Alert.alert('Please fill in the full form.');
    }
    createEvent(data as unknown as Event)
      .then(res => {
        navigation.goBack();
        console.log(res);
      })
      .catch(error => console.error(error));
  };

  return (
    <Screen preset="scroll">
      <View style={$formContainer}>
        <FormProvider {...formMethods}>
          <ControlledTextField
            label={translate('enterTextHere')}
            multiline
            numberOfLines={8}
            name="eventMetadata"
          />

          <Button mode="contained" onPress={formMethods.handleSubmit(onSubmit)}>
            {translate('save')}
          </Button>
        </FormProvider>
      </View>
    </Screen>
  );
}

const $formContainer: ViewStyle = {
  rowGap: 10,
  paddingTop: 20,
};
