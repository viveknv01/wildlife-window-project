// UI preferences only. Do not store sightings, captures, or other player records.
(() => {
  const KEY = 'ww_always_curtain_raised';
  const HQ_KEY = 'ww_camera_hq_capture';

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

  function getCameraHqCapture() {
    try {
      return localStorage.getItem(HQ_KEY) === '1';
    } catch (err) {
      return false;
    }
  }

  function setCameraHqCapture(on) {
    try {
      if (on) localStorage.setItem(HQ_KEY, '1');
      else localStorage.removeItem(HQ_KEY);
    } catch (err) {
      // Storage blocked (private mode); the toggle still works for this visit.
    }
  }

  window.WildlifeSettings = {
    getAlwaysCurtainRaised,
    setAlwaysCurtainRaised,
    getCameraHqCapture,
    setCameraHqCapture
  };
})();
