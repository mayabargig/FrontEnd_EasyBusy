import React from 'react'

export default function CalenderComponents(props) {
   const { value } = props;
   const formattedDate = value.replace(/-/g, "/");
  console.log(formattedDate); 

  return (
    <div>
      <h1>{formattedDate}</h1>
      
    </div>
  )
}
