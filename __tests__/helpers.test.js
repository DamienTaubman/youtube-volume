// tests/helpers.test.js
const { qs, nativeGetVolume, nativeSetVolume, refreshVolume, clampVolume } = require("../src/helpers");

describe("Helper Functions", () => {
  // Test for qs function
  describe("qs", () => {
    it("should select the correct DOM element", () => {
      document.body.innerHTML = `<div class="test-element"></div>`;
      const element = qs(".test-element");
      expect(element).not.toBeNull();
    });
  });

  // Test for clampVolume function
  describe("clampVolume", () => {
    it("should clamp volume to the nearest step", () => {
      expect(clampVolume(0.052)).toBe(0.05);
      expect(clampVolume(0.057)).toBe(0.06);
    });

    it("should return 0 for 0 input", () => {
      expect(clampVolume(0)).toBe(0);
    });

    it("should handle large volumes", () => {
      expect(clampVolume(0.995)).toBe(1.0);
    });
  });

  // Test for nativeGetVolume and nativeSetVolume
  // Note: These are tricky to test directly without a live DOM element, so generally, we assume they work correctly as they wrap native APIs.
  describe("native volume controls", () => {
    it("should return the native volume methods", () => {
      expect(typeof nativeGetVolume).toBe("function");
      expect(typeof nativeSetVolume).toBe("function");
    });
  });

  // Test for refreshVolume function
  describe("refreshVolume", () => {
    it("should refresh the volume on a given element", () => {
      const mockElement = {
        getVolume: jest.fn().mockReturnValue(0.5),
        setVolume: jest.fn(),
      };

      refreshVolume(mockElement);

      expect(mockElement.getVolume).toHaveBeenCalled();
      expect(mockElement.setVolume).toHaveBeenCalledWith(0.5);
    });

    it("should use the default parameter when called without arguments", () => {
      // Mock the query selector
      const mockElement = {
        getVolume: jest.fn().mockReturnValue(0.5),
        setVolume: jest.fn(),
      };

      jest.spyOn(document, "querySelector").mockReturnValue(mockElement);

      refreshVolume(); // No arguments passed, should use default

      expect(mockElement.getVolume).toHaveBeenCalled();
      expect(mockElement.setVolume).toHaveBeenCalledWith(0.5);

      // Restore original functionality
      document.querySelector.mockRestore();
    });

    it("should use the provided parameter when called with an argument", () => {
      const mockElement = {
        getVolume: jest.fn().mockReturnValue(0.7),
        setVolume: jest.fn(),
      };

      refreshVolume(mockElement); // Argument provided

      expect(mockElement.getVolume).toHaveBeenCalled();
      expect(mockElement.setVolume).toHaveBeenCalledWith(0.7);
    });
  });
});
