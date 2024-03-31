import React from 'react'
import styled from 'styled-components';

const AnimatedField = ({
    label = 'Text',
    icon
}) => {
    return (
        <FormGroup className="form__group field">
            <FormField
                type="text"
                className="form__field"
                placeholder={label}
                id="field"
                required
            />
            <FormLabel htmlFor="field" className="form__label">
                {label}
            </FormLabel>

            <IconWrapper>
                {icon}
            </IconWrapper>
        </FormGroup>
    )
}

const FormGroup = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 100%;
`;

const FormField = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #616161;
  outline: 0;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 7px 25px 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  &:focus {
    ~ label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      font-weight: 400;
    }
    padding-bottom: 6px;
    font-weight: 400;
    border-width: 3px;
    border-image: linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8));
    border-image-slice: 1;
  }

  /* Reset input */
  &:required, &:invalid {
    box-shadow: none;
  }
`;

const FormLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #616161;
`;

const IconWrapper = styled.div`
    height: 70%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    position: absolute;
    right: -16px;
    top: 50%;
    z-index: 2;

`;

export default AnimatedField