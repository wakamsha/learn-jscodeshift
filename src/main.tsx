import React from 'react';

type Props = {
  count: number;
};

export const App = ({ count }: Props) => (
  <>
    <ul>
      {[...Array(count).keys()].map(i => (
        <li key={i}>item {i}</li>
      ))}
    </ul>
    
    <ol>
      {[...Array(4).keys()].map(i => (
        <li key={i}>item {i}</li>
      ))}
    </ol>
  </>
);
