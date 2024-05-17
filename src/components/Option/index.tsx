import React from 'react';
import { Props } from './index.d';

const Option: React.FC<Props> = ({ datas, style, id, name, value, required, onChange, text }) => {
  return (
    <select 
      id={id}
      name={name}
      value={value}
      onChange={(e)=>onChange(e)}
      required={required}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${style}`}
    >
         <option value="" disabled selected>{text ? text : "Select an option"}</option>
        {
            datas && datas.map((item, index) => {
                return (
                    <option value={item.id} key={index}>{item.name}</option>
                )
            })
        }
    </select>
  );
};

export default Option;
