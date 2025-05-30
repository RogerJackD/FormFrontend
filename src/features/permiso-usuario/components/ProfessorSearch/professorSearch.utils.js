export const formatProfessorOptions = (professors) => {
  return professors.map(professor => ({
    value: professor.id,
    label: `${professor.nombre} ${professor.apellidos} (ID: ${professor.idSenati})`,
    data: professor
  }));
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};