import React, { useEffect, useMemo, useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useDatabase } from "@nozbe/watermelondb/hooks"
import { isValid } from "date-fns"
import { Q } from "@nozbe/watermelondb"
import { View, ViewStyle } from "react-native"
import { Screen } from "../components/Screen"
import { Text } from "../components/Text"
import { ControlledTextField } from "../components/ControlledTextField"
import { ControlledRadioGroup } from "../components/ControlledRadioGroup"
import { ControlledDatePickerButton } from "../components/DatePicker"
import { Button } from "../components/Button"
import { translate } from "../i18n"
import { PatientFlowParamList } from "../navigators/PatientFlowNavigator"
import EventFormModel from "../db/model/EventForm"
import { ControlledSelectField } from "../components/ControlledSelectField"
import { createEvent, updateEvent } from "../db/api"
import { parseMetadata } from "../utils/parsers"
import { DiagnosisPickerButton, ICD10Entry } from "./DiagnosisPicker"
import { MedicationEntry, MedicationsFormItem } from "./MedicationEditor"

type Props = NativeStackScreenProps<PatientFlowParamList, "EventForm">

type FormData = {
  name: string
  description: string
  type: string
}

// Take the medications array and add a new medication if there is no medication with its id, otherswise update the medication
const updateMedications = (medications: MedicationEntry[], newMedication: MedicationEntry) => {
  const medicationIndex = medications.findIndex((m) => m.id === newMedication.id)
  if (medicationIndex === -1) {
    return [...medications, newMedication]
  } else {
    return medications.map((m, i) => (i === medicationIndex ? newMedication : m))
  }
}

export function EventFormScreen(props: Props) {
  const { navigation, route } = props
  const { patientId, formId, visitId, diagnoses: selectedDiagnoses, medication, formData, onUpdate } = route.params
  const [eventForm, setEventForm] = useState<EventFormModel | null>(null)
  const [diagnoses, setDiagnoses] = useState<ICD10Entry[]>([])
  const [medications, setMedications] = useState<MedicationEntry[]>([])
  const [loading, setLoading] = useState(false)

  const { ...formMethods } = useForm()
  const database = useDatabase()

  // On page load, if there is formData in the props, set the data from the form data and set the eventForm from the event_type
  useEffect(() => {
    console.log({ formData })
    if (formData) {
      const metadata = formatDates(parseMetadata(JSON.parse(formData)?.event_metadata));
      // if there is a date field in the metadata, ensure that the date is a Date object
      console.log({ event_metadata: JSON.parse(formData)?.event_metadata, metadata })

      if (metadata?.date) {
        metadata.date = new Date(metadata.date)
      }
      if (metadata) {
        // set the diagnosis and medications from the formData
        setDiagnoses(metadata.diagnosis)
        setMedications(metadata.medications)
        formMethods.reset(metadata)
      }

      // Query the database for the event form with the name equal to the formData.event_type
      console.log("Query db for forms")
      database.get<EventFormModel>("event_forms").query(Q.where("name", JSON.parse(formData).event_type)).fetch().then((form) => {
        // if there are forms returned, get the first form from the database
        console.log("Found forms:", form.length)
        if (form.length > 0) {
          const formObj: EventFormModel = {
            name: form[0].name,
            description: form[0].description,
            id: form[0].id,
            isEditable: form[0].isEditable,
            isSnapshotForm: form[0].isSnapshotForm,
            language: form[0].language,
            metadata: form[0].metadata,
          }
          console.log({ formObj, metadata: formObj.metadata })
          setEventForm(formObj)
        }
      })
    } else if (formId) {

      database
        .get<EventFormModel>("event_forms")
        .find(formId)
        .then((form) => {
          const formObj = {
            name: form.name,
            description: form.description,
            id: form.id,
            isEditable: form.isEditable,
            isSnapshotForm: form.isSnapshotForm,
            language: form.language,
            metadata: form.metadata,
          }
          console.log(formId, formObj.metadata, form);
          console.log(
            "form",
            formObj.metadata.map((f) => f.fields),
          )
          setEventForm(formObj)
          navigation.setOptions({ title: form.name })
        })
        .catch((err) => {
          console.error("error", err)
          setEventForm(null)
        })
    }
  }, [formData, formId])


  // if route has diagnoses, set diagnoses to route diagnoses
  useEffect(() => {
    if (selectedDiagnoses && selectedDiagnoses.length > 0) {
      setDiagnoses(selectedDiagnoses)
    }
    if (medication) {
      setMedications((s) => updateMedications(s, medication))
    }
  }, [selectedDiagnoses, medication])

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (loading) {
      return
    }
    // if diagnosis is in form, add diagnoses to data
    if (eventForm?.metadata.find((f) => f.fieldType === "diagnosis")) {
      data.diagnosis = diagnoses
    }

    // if medication is in form, add medications to data
    if (eventForm?.metadata.find((f) => f.fieldType === "medicine")) {
      data.medications = medications
    }

    setLoading(true)

    if (formData && JSON.parse(formData).id) {
      return updateEvent(JSON.parse(formData).id, {
        eventMetadata: JSON.stringify(data)
      }).then(res => navigation.goBack({ refresh: true })).catch(err => console.error(err)).finally(() => { setLoading(false); onUpdate && onUpdate() })
    }
    createEvent({
      eventType: eventForm.name,
      patientId,
      visitId,
      isDeleted: false,
      eventMetadata: data,
    })
      .then((res) => {
        navigation.goBack({
          refresh: true
        })
        onUpdate && onUpdate()
      })
      .catch((err) => {
        console.error("error", err)
      }).finally(() => setLoading(false))
  }

  const deleteMedication = (id: string) => {
    setMedications((s) => s.filter((m) => m.id !== id))
  }

  const canSaveForm = useMemo(() => {
    if (loading || (formData && eventForm?.isEditable === false)) {
      return false
    }
    return true
  }, [formData, eventForm, loading])

  return (
    <Screen preset="scroll">
      <FormProvider {...formMethods}>
        <View style={$formContainer}>
          {eventForm &&
            eventForm.metadata.map((field) => {
              if (field.inputType === "text") {
                return (
                  <ControlledTextField
                    key={field.id}
                    name={field.name}
                    label={field.name}
                    mode="outlined"
                  />
                )
              } else if (field.inputType === "number") {
                return (
                  <ControlledTextField
                    key={field.id}
                    name={field.name}
                    label={field.name}
                    mode="outlined"
                    keyboardType="numeric"
                  />
                )
              } else if (field.inputType === "radio") {
                return (
                  <ControlledRadioGroup
                    key={field.id}
                    name={field.name}
                    label={field.name}
                    options={field.options}
                  />
                )
              } else if (field.inputType === "checkbox") {
                return (
                  <ControlledRadioGroup
                    key={field.id}
                    name={field.name}
                    label={field.name}
                    options={field.options}
                  />
                )
              } else if (field.inputType === "date") {
                return (
                  <>
                    <Text variant="labelLarge">{field.name}</Text>
                    <ControlledDatePickerButton
                      key={field.id}
                      name={field.name}
                      label={field.name}
                      keyboardType="numeric"
                    />
                  </>
                )
              } else if (field.inputType === "select" && field.fieldType !== "diagnosis") {
                return (
                  <ControlledSelectField
                    key={field.id}
                    name={field.name}
                    label={field.name}
                    options={field.options}
                  />
                )
              } else if (field.inputType === "dropdown" && field.fieldType === "diagnosis") {
                return <DiagnosisPickerButton key={field.id} value={diagnoses || []} />
              } else if (field.inputType === "textarea") {
                return (
                  <ControlledTextField
                    key={field.id}
                    name={field.name}
                    label={field.name}
                    multiline
                    mode="outlined"
                    numberOfLines={4}
                  />
                )
              } else if (field.inputType === "input-group" && field.fieldType === "medicine") {
                return (
                  <MedicationsFormItem
                    key={field.id}
                    value={medications || []}
                    deleteEntry={deleteMedication}
                    viewOnly={false}
                  />
                )
              } else {
                return <Text>Not implemented yet</Text>
              }
            })}
          <Button mode="contained" disabled={!canSaveForm} loading={loading} onPress={formMethods.handleSubmit(onSubmit)}>
            {translate("save")}
          </Button>
          <View style={{ height: 40 }} />
        </View>
      </FormProvider>
    </Screen>
  )
}

// Function takes an object, if any of the values are a valid date or string that could be a dete, format them into a Date object
const formatDates = (obj: any) => {
  const newObj = { ...obj }
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] && (newObj[key].includes("/") || newObj[key].includes("-"))) {
      newObj[key] = isValid(new Date(newObj[key])) ? new Date(newObj[key]) : newObj[key]
    }
  })
  return newObj
}


const $flex1: ViewStyle = {
  flex: 1,
}

const $formContainer: ViewStyle = {
  rowGap: 10,
  paddingTop: 20,
}
