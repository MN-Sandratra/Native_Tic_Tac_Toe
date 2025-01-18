import { createLogger } from "redux-logger";

const middleware = [
  createLogger({
    duration: true,
    timestamp: false,
    collapsed: true,
    colors: {
      title: (action) => {
        if (action.type.endsWith("rejected")) {
          return "#ff0005";
        }
        if (action.type.endsWith("pending")) {
          return "#8798AD";
        } else {
          return "#139BFE";
        }
      },
      prevState: () => "#1C5FAF",
      action: () => "#149945",
      nextState: () => "#A47104",
      error: () => "#ff0005",
    },
    predicate: () => typeof window !== "undefined",
  }),
];

export { middleware };
