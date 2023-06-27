import React from "react";
/*
Generics, in a nutshell, are nothing more than a placeholder for a type. It’s a way to tell typescript: I know I will have a type here, but I have no idea what it should be yet, I’ll tell you later.
*/
//!declaring generic constant
/*
Constraints are used to narrow down the generic type so that typescript can make at least some assumptions about TValue. Basically, it’s a way to tell typescript: I have no idea what TValue should be yet, but I know for a fact that it will always have a
*/
//!this is the base
type Base = { id: string } | string;
//! this is the type of props that we are going to pass to GenericSelect component
type GenericSelectProps<TValue> = {
  formatLabel: (value: TValue) => string;
  onChange: (value: TValue) => void;
  values: Readonly<TValue[]>;
};
//! this function is used to get string and object values 
const getStringFromValue = <TValue extends Base>(value: TValue) => {
  if (typeof value === "string") return value;

  return value.id;
};

export const GenericSelect = <TValue extends Base>(
  props: GenericSelectProps<TValue>
) => {
  const { values, onChange, formatLabel } = props;

  const onSelectChange = (e:React.ChangeEvent<HTMLSelectElement>):void => {
    const val = values.find(
      (value) => getStringFromValue(value) === e.target.value
    );

    if (val) onChange(val);
  };

  return (
    <select onChange={onSelectChange}>
      {values.map((value) => (
        <option
          key={getStringFromValue(value)}
          value={getStringFromValue(value)}
        >
          {formatLabel(value)}
        </option>
      ))}
    </select>
  );
};
