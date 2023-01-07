const withDisplayName = (component, displayName) => {
  const componentWithDisplayName = component;
  componentWithDisplayName.displayName = displayName;
  return component;
};

export default withDisplayName;
