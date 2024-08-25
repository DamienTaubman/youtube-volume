import { clampVolume, refreshVolume, nativeGetVolume, nativeSetVolume } from "./helpers";

Object.defineProperty(HTMLMediaElement.prototype, "volume", {
  get() {
    return nativeGetVolume.call(this) ** (1 / 3);
  },
  set(volume) {
    nativeSetVolume.call(this, clampVolume(volume) ** 3);
  },
});

refreshVolume();
