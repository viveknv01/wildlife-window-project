// One UI preference only. Do not store sightings, captures, or other player records.
(() => {
  const KEY = 'ww_always_curtain_raised';

  function getAlwaysCurtainRaised() {
    try {
      return localStorage.getItem(KEY) === '1';
    } catch (err) {
      return false;
    }
  }

  function setAlwaysCurtainRaised(on) {
    try {
      if (on) localStorage.setItem(KEY, '1');
      else localStorage.removeItem(KEY);
    } catch (err) {
      // Storage blocked (private mode); the toggle still works for this visit.
    }
  }

  window.WildlifeSettings = { getAlwaysCurtainRaised, setAlwaysCurtainRaised };
})();
