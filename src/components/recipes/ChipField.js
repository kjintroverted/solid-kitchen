import { Chip, TextField } from "@material-ui/core";
import { useState } from "react";
import { Row } from "../styled";

function ChipField({ data, onSubmit }) {

  const [value, setValue] = useState("");

  function checkReturn(e) {
    if (e.key !== 'Enter' || !value) return;
    setValue("")
    onSubmit(value)
  }

  return (
    <Row>
      {
        data.map(d => <Chip key={ d } color="primary" label={ d } size="small" />)
      }
      <TextField
        style={ { flex: 1 } }
        placeholder="add tag..."
        value={ value }
        onChange={ e => setValue(e.target.value) }
        onKeyDown={ checkReturn } />
    </Row>
  )
}

export default ChipField;