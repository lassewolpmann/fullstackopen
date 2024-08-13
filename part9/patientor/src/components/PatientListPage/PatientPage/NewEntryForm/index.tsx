import React, { BaseSyntheticEvent, useState } from "react";
import patientService from "../../../../services/patients.ts";
import { EntryWithoutId, Patient } from "../../../../types.ts";

interface Props {
  id: string,
  patient: Patient,
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>
}

const NewEntryForm = (props: Props) => {
  const { id, patient, setPatient } = props;

  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [codes, setCodes] = useState<string>('');


  const style = {
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px 20px',
    margin: '10px 0'
  };

  const toggleForm = () => setFormVisible(!formVisible);

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    const object: EntryWithoutId = {
      date: date,
      description: description,
      specialist: specialist,
      type: "HealthCheck",
      healthCheckRating: Number(rating)
    };

    patientService.createEntry(object, id)
      .then(data => {
        setPatient({
          ...patient,
          entries: patient.entries.concat(data)
        });

        toggleForm();
        setDescription('');
        setDate('');
        setSpecialist('');
        setRating('');
        setCodes('');
      })
      .catch(error => console.log(error));
  };

  if (!formVisible) {
    return (
      <button onClick={toggleForm}>add new entry</button>
    );
  } else {
    return (
      <form style={style} onReset={toggleForm} onSubmit={handleSubmit}>
        <h2>New HealthCheck entry</h2>
        <p>
          <label htmlFor={"description"}>Description: </label>
          <input type="text" name="description" value={description}
                 onChange={(event => setDescription(event.target.value))} />
        </p>
        <p>
          <label htmlFor={"date"}>Date: </label>
          <input type="text" name="date" value={date}
                 onChange={(event => setDate(event.target.value))} />
        </p>
        <p>
          <label htmlFor={"specialist"}>Specialist: </label>
          <input type="text" name="specialist" value={specialist}
                 onChange={(event => setSpecialist(event.target.value))} />
        </p>
        <p>
          <label htmlFor={"rating"}>Rating: </label>
          <input type="text" name="rating" value={rating}
                 onChange={(event => setRating(event.target.value))} />
        </p>
        <p>
          <label htmlFor={"codes"}>Diagnosis codes: </label>
          <input type="text" name="codes" value={codes}
                 onChange={(event => setCodes(event.target.value))} />
        </p>
        <button type="reset">cancel</button>
        <button type="submit">add entry</button>
      </form>
    );
  }
};

export default NewEntryForm;