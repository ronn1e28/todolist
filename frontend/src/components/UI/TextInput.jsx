import React from 'react'
import { useField } from "formik";


function TextInput({inputStyle, ...props}) {
    const [field, meta] = useField(props);
    return (
      <>
        <input className={inputStyle} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{meta.error}</div>
        ) : null}
      </>
    );
}

export default TextInput