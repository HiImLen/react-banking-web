
import React from 'react';
import { useParams } from 'react-router';

export default function Transaction() {
  const {status} = useParams()
  console.log(status);

  return (
      <div> {status} </div>
    );
}