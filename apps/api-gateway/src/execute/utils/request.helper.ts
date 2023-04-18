function handleEmptyInputArray(inputArray : string[]) : string[] {
  if(inputArray.length == 0)
  {
    return [""];
  }
  return inputArray;
}

export {handleEmptyInputArray};