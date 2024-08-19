import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formValid = true;
      const updatedInputs = {
        ...state.inputs,
        [action.inputId]: { value: action.value, isValid: action.isValid },
      };
      for (const inputId in updatedInputs) {
        formValid = formValid && updatedInputs[inputId].isValid;
      }
      return {
        ...state,
        inputs: updatedInputs,
        isValid: formValid,
      };
    case "SET_DATA":
      return {
        ...state,
        inputs: action.inputs,
        isValid: action.formValidity,
      };
    default:
      return state;
  }
};

export const useForm = (initialState, initialValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialState,
    isValid: initialValidity,
  });

  const inputHandler = useCallback((id, input, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: input,
      isValid: isValid,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formValidity: formValidity,
    });
  }, []);
  return [formState, inputHandler, setFormData];
};
