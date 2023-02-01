import { nanoid } from 'nanoid';
import { FilterContainer, Label } from './FilterContacts.styled';
import PropTypes from 'prop-types';

export const FilterContacts = ({ filter, onChangeInput }) => {
  const idForFilterInput = nanoid();

  return (
    <FilterContainer>
      <Label htmlFor={idForFilterInput}>Find contacts by name</Label>
      <input
        id={idForFilterInput}
        type="text"
        name="filter"
        value={filter}
        onChange={onChangeInput}
      />
    </FilterContainer>
  );
};

FilterContacts.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};
