const originalVolumes = new WeakMap();

const makeVolumeControlExponential = (exponent = 3) => {
  const { get: nativeGetVolume, set: nativeSetVolume } = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "volume");
  Object.defineProperty(HTMLMediaElement.prototype, "volume", {
    get() {
      return originalVolumes.get(this) ?? nativeGetVolume.call(this) ** (1 / exponent);
    },
    set(volume) {
      originalVolumes.set(this, volume);
      nativeSetVolume.call(this, volume ** exponent);
    },
  });
};

const qs = (selector) => document.querySelector(selector);
const updateVolume = (e = qs(".html5-video-player")) => e.setVolume(e.getVolume());

(() => makeVolumeControlExponential() && updateVolume())();
