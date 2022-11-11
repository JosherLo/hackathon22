import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "@emotion/styled";

type DropdownProps = {
  items: string[],
  onChange: Function,
  placeholder: string,
};

export const Dropdown = forwardRef((props: DropdownProps, ref) => {

  const [ items, setItems ] = useState([ ...props.items ]);
  const [ selectedItem, setSelectedItem ] = useState(props.items[0]);

  const changeSelected = (item: string) => {
    const prev = selectedItem;
    setSelectedItem(item);
    props.onChange(prev, item);
  }

  useImperativeHandle(ref, () => ({
    setItems: (items: string[]) => {
      setItems([ ...items ]);
    },
    getSelectedItem: () => {
      return selectedItem;
    },
    setSelectedItem: (item: string) => {
      setSelectedItem(item);
    }
  }));

  const itemComponents = [];

  for (let item of items) {
    itemComponents.push(
      <DropdownItem onClick={ () => changeSelected(item) }>
        <DropdownItemText>{ item }</DropdownItemText>
      </DropdownItem>
    )
  }

  return (
    <DropdownContainer>
      <DropdownSelectedItemContainer>
        { props.placeholder || selectedItem }
        <DropdownItemsContainer>{ itemComponents }</DropdownItemsContainer>
      </DropdownSelectedItemContainer>
    </DropdownContainer>
  )

});

const DropdownContainer = styled.div`
  display: flex;
  height: 39.5px;
`;

const DropdownSelectedItemContainer = styled.button`
  border-radius: 10px;
  background-color: transparent;
  font-size: 16px;
  color: white;
  padding: 10px;
  border: none;
  outline: white;
  
  &:hover {
    cursor: pointer;
  }
  
`;

const DropdownItemsContainer = styled.div`
  position: absolute;
  display: none;
  background-color: #5f5f5f;
  z-index: 100;
  
  ${ DropdownSelectedItemContainer }:focus-within & {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 20px 0 0 -50px;
  }
`;

const DropdownItem = styled.div`
  padding: 10px;
`;

const DropdownItemText = styled.text`
  font-size: 16px;
  color: white;
  display: inline-block;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover {
    color: white;
    cursor: pointer;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  &:hover {
    cursor: pointer;
  }
`;