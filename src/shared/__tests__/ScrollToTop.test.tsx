import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ScrollToTop from "../components/ScrollToTop";

describe("ScrollToTop component", () => {
  it("llama a window.scrollTo al cambiar de ruta", () => {
    const scrollSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    
    const { rerender } = render(
      <MemoryRouter initialEntries={["/inicio"]}>
        <Routes>
          <Route path="*" element={<ScrollToTop />} />
        </Routes>
      </MemoryRouter>
    );

    rerender(
      <MemoryRouter initialEntries={["/otra-ruta"]}>
        <Routes>
          <Route path="*" element={<ScrollToTop />} />
        </Routes>
      </MemoryRouter>
    );

    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    scrollSpy.mockRestore();
  });
});
