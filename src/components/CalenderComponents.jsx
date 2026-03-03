import React from 'react'

export default function CalenderComponents(props) {
   const { value } = props;
   const formattedDate = value.replace(/-/g, "/");

  return (
    <div>
      <h1>{formattedDate}</h1>
    </div>
  )
}
