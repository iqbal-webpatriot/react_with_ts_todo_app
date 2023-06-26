import React from "react";

/*
Generics, in a nutshell, are nothing more than a placeholder for a type. It’s a way to tell typescript: I know I will have a type here, but I have no idea what it should be yet, I’ll tell you later.
*/
//!declaring generic constant
/*
Constraints are used to narrow down the generic type so that typescript can make at least some assumptions about TValue. Basically, it’s a way to tell typescript: I have no idea what TValue should be yet, but I know for a fact that it will always have a
*/
type Base = {
  id: string;
  title: string;
};

type GenericSelectProps<TValue> = {
  values: TValue[];
  onChange: (value: TValue) => void;
};

export const GenericSelect = <TValue extends Base>({
  values,
  onChange,
}: GenericSelectProps<TValue>) => {
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const val = values.find((cv) => cv.id === e.target.value);

    if (val) onChange(val);
  };

  return (
    <select onChange={onSelectChange}>
      {values.map((value) => (
        <option key={value.id} value={value.id}>
          {value.title}
        </option>
      ))}
    </select>
  );
};
