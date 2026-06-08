export const generateRoutes = (sidebar) => {
  return sidebar.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    })),
  );
};
