import { Diagnosis } from "../../../../../types.ts";
import { useEffect, useState } from "react";
import diagnosisService from "../../../../../services/diagnoses.ts";

const DiagnosisListing = ({ code }: { code: string }) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();

  useEffect(() => {
    diagnosisService.getAll()
      .then(diagnoses => {
        const diagnosis = diagnoses.find(d => d.code === code);
        if (diagnosis) {
          setDiagnosis(diagnosis);
        }
      });
  }, [code]);

  if (!diagnosis) {
    return null;
  }

  return (
    <div>
      {code} {diagnosis.name}
    </div>
  );
};

export default DiagnosisListing;