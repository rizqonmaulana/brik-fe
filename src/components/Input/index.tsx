import React from 'react';
import { Props } from './index.d'

const Input: React.FC<Props> = ({ id, name, required, label, type, accept, value, placeholder, style, onChange }) => {
  return (
    <div className="mb-4">
      {
        label && (
            <label className="block text-gray-700">{label}</label>
        )
      }
      {
        type === 'textarea' ? (
          <>
            <textarea
              id={id}
              name={name}
              required={required}
              value={value}
              onChange={(e) => onChange(e)}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
            ></textarea>
          </>
        ) : (
          <input
            id={id}
            name={name}
            required={required}
            accept={accept}
            type={type ? type : 'text'}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${style}`}
            value={value}
            onChange={(e) => onChange(e)}
          />
        )
      }
    </div>
  );
};

export default Input;
