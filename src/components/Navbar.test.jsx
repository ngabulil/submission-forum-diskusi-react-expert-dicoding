import { render } from "@testing-library/react";
import { describe, expect, vitest } from "vitest";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";

vitest.mock("react-redux", async () => ({
  ...(await vitest.importActual("react-redux")),
  useDispatch: vitest.fn(),
}));

describe("render", () => {
  it("should render", () => {
    const component = render(
      <BrowserRouter>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </BrowserRouter>
    );
    expect(component).toBeTruthy();
  });
});
