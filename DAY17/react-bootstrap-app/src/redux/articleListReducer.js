function articleListReducer(state, action) {
  switch (action.type) {
    case 'DELETE':
      return state.filter((art) => action.payload !== art.id)
    case 'UPDATE':
      return state.map((art, i) => (art.id === action.payload.id ? action.payload : art))
    case 'UPLOAD':
      return [...state, { id:state.length, ...action.payload}]
    default:
      return [...state]
  }
}

export default articleListReducer
