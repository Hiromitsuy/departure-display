type State = {
  inputContent: String,
}

type Action = {
  changeInputContent: (text: String) => {},
  allClear: () => {},
  saveFile: () => {},
  readFile: (path: String) => {},
}

