export default function (state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function initializer() {
  return {
    items: [],
    query: ''
  };
}