const initalState = {
  currentSettings: {},
  currentComponent: undefined,
  currentComponentSelectId: undefined,
};

const selector = (state = initalState, actions) => {
  const { type, data } = actions;
  switch (type) {
    case "UPDATE_SELECT_COMPONENT":
      let currentComponent = data.currentComponent;
      let currentSettings = data.currentSettings;
      let currentComponentSelectId = data.currentComponentSelectId;

      return {
        currentComponent,
        currentSettings,
        currentComponentSelectId,
      };
    default:
      return state;
  }
};

export default selector;
