import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { fetchProfessors } from './professorSearch.service';
import { formatProfessorOptions, debounce } from './professorSearch.utils';
import { containerStyles, selectedProfessorStyles } from './professorSearch.styles';

const ProfessorSearch = ({ onProfessorSelected }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const loadOptions = useCallback(async (query) => {
    setIsLoading(true);
    const professors = await fetchProfessors(query);
    setOptions(formatProfessorOptions(professors));
    setIsLoading(false);
  }, []);

  const debouncedLoadOptions = useCallback(
    debounce(loadOptions, 500),
    [loadOptions]
  );

  useEffect(() => {
    debouncedLoadOptions(inputValue);
    return () => debouncedLoadOptions.cancel?.();
  }, [inputValue, debouncedLoadOptions]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleChange = (selectedOption) => {
    setSelectedProfessor(selectedOption);
    if (selectedOption && onProfessorSelected) {
      onProfessorSelected(selectedOption.data);
    }
  };

  return (
    <div style={containerStyles}>
      <h2 className='font-semibold text-xl'>Buscar Profesor</h2>
      <Select
        isClearable
        isSearchable
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        isLoading={isLoading}
        placeholder="Escribe el ID o nombre del profesor..."
        noOptionsMessage={() => 
          inputValue.length < 2 
            ? 'Escribe al menos 2 caracteres' 
            : 'No se encontraron profesores'
        }
        loadingMessage={() => 'Buscando profesores...'}
        value={selectedProfessor}
      />
    </div>
  );
};

export default ProfessorSearch;