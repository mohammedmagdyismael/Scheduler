import ReactGA from "react-ga";

const useAnalyticsEventTracker = category => {
  const eventTracker = (action, label = "test label") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}
export default useAnalyticsEventTracker;