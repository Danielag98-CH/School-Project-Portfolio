import Form from 'react-bootstrap/Form';

const Dropdown = ({options, onOptionSelected, createNew, selectedValue}) => {
  return (
    <Form.Control
      required
      as="select"
      value={selectedValue} 
      onChange={evt => onOptionSelected(evt.target.value)} 
      id={createNew} 
      className="form-select"
    >
      <option value="" disabled>Choose one...</option>
      {options.map(opt => <option 
                            key={opt.value} 
                            value={opt.value}
                            >
                              {opt.text}
                            </option>)}
    </Form.Control>
  )
}

export default Dropdown;