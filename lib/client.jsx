const {Router} = ReactRouter;

ReactRouterSSR.Run = function(routes, clientOptions) {
  if (!clientOptions) {
    clientOptions = {};
  }

  const history = clientOptions.history || ReactRouter.history.useQueries(ReactRouter.history.createHistory)();
  const provider = clientOptions.provider || null;

  Meteor.startup(function() {
    const rootElementName = clientOptions.rootElement || 'react-app';
    let rootElement = document.getElementById(rootElementName);

    // In case the root element doesn't exist, let's create it
    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.id = rootElementName;
      document.body.appendChild(rootElement);
    }

    ReactDOM.render(
      {provider && <Provider={provider}>}
      <Router
        history={history}
        children={routes}
        {...clientOptions.props} />
      {provider && </Provider>}
      , rootElement
    );

    let collectorEl = document.getElementById(clientOptions.styleCollectorId || 'css-style-collector-data')

    if (collectorEl) {
      collectorEl.parentNode.removeChild(collectorEl);
    }
  });
}
