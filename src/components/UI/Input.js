import React from 'react';
import styled from 'styled-components';

const Input = () => {
  return (
    <Field>
      <input></input>
    </Field>
  )
}

const Field = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 10px;

  width: 390px;
  height: 40px;

  background: #E0E0E0;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export default Input
