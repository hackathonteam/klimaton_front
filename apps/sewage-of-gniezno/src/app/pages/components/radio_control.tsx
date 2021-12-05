import { FormControlLabel, Radio } from '@mui/material';
import { CaseState } from '../results';

type Props = {
  setCaseState: (state: CaseState) => void;
  caseState: CaseState;
  value: CaseState;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
};

const RadioControl = ({ setCaseState, caseState, value, color }: Props) => {
  return (
    <FormControlLabel
      control={<Radio color={color} />}
      label={value}
      checked={caseState === value}
      value={value}
      onClick={() => setCaseState(value)}
    />
  );
};

export default RadioControl;
