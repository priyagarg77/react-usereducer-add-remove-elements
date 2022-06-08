import React, { useRef, useReducer } from 'react';
import './style.css';

export default function App() {
  const inputFieldRef = useRef();

  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return [
          ...state,
          {
            id: state.length + 1,
            name: action.name,
          },
        ];
      case 'delete':
        return state.filter((self, index) => index != action.index);
      default:
        return state;
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'add',
      name: inputFieldRef.current.value,
    });

    inputFieldRef.current.value = '';
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Enter a text..." ref={inputFieldRef} />
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => dispatch({ type: 'delete', index })}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
