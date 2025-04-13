const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

const service = useMock
  ? require("./taskService.mock")
  : require("./taskService.real"); 

module.exports = service;
