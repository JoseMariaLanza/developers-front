import React from "react"
import Select from 'react-select'

export const CustomReactSelect = (props) => {
  console.log(props)
  let isSelected = true

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: isSelected ? {...provided} : '1px solid red'
    })
  }

  const handleChange = (e) => {
    console.log(e.value)
    isSelected = true
  }

  const handleBlur = (e) => {
    // console.log(e.target.offsetParent.innerText)
    console.log(e)
    if (e.target.value) {
      isSelected = true
    } else {
      isSelected = false
    }
  }

  return (
    <>
      <Select {...props} onBlur={handleBlur} styles={customStyles} />
    </>
  )
}