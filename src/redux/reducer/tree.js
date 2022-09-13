const inialState = {
  tree: [],
};

/*
* tree : [{
    top:0,
    name:'Test',
    settings:[],
    cid:"123"
}]
* 
**/

const tree = (state = inialState, actions) => {
  const { type, data } = actions;
  switch (type) {
    case "APPEND_COMPONENT":
      state.tree.push(data);
      return state;
    case "DELETE_COMPONENT":
      let { cid } = data;
      state.tree = state.tree.filter((item) => item.cid !== cid);
      return state;
    case "UPDATE_COMPONENT_SETTINGS":
      state.tree = state.tree.map((item) => {
        if (item.cid === data.cid) {
          for (let i = 0; i < item.settings.length; i++) {
            if (item.settings[i].fid === data.fid) {
              item.settings[i].$settings = data.$settings;
              break;
            }
          }
        }
        return item;
      });
      return state;
    case "APPEND_COMPONENT_SETTINGS":
      state.tree = state.tree.map((item) => {
        if (item.cid === data.cid) {
          item.settings.push(data.append);
        }
        return item;
      });
      return { ...state };
    case "DELETE_TREE_SETTINGS":
      state.tree = [];
      return { ...state };
    case "INITAL_TREE":
      state.tree = data;
      return { ...state };
    case "QUASH_TREE":
      state.tree.pop();
      return { ...state };
    default:
      return state;
  }
};

export default tree;
