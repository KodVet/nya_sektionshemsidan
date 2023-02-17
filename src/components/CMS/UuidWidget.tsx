// reference https://github.com/antondb/netlify-cms-widget-uuid
import React from 'react';
import type { WidgetControlProps } from '@staticcms/core';

interface UuidField {
  name: 'uuid';
  widget: 'uuid';
}

const createUuid = (options = { size: 8, url: 'int8rdomaluesbj012345679cfghkpqvwxyzZ' }) => {
  let { size, url } = options;
  let id = '';
  while (0 < size--) {
    id += url[(Math.random() * 37) | 0];
  }
  return id;
};
//
const UuidControl = ({ label, value, path, field, onChange }: WidgetControlProps<string, UuidField>) => {
  // const [internalValue, setInternalValue] = useState(value ?? '');
  // console.log(label, value, path, field, onChange);
  if (!value) {
    value = createUuid().trim();
    onChange(value);
  }
  return (
    <div style={{ display: 'flex' }}>
      <input type='hidden' id={path} key='uuid-input' value={value} />
      <div>
        {label} : {value}
      </div>
    </div>
  );
};

export default UuidControl;