import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";
import ShopContextProvider from "./context/shopContext";

const products = [
  { id: 2, name: "Test Product", image: "test.png", category: "women", new_price: 20, old_price: 30 },
];

const renderApp = (route = "/") => {
  window.history.pushState({}, "", route);
  return render(
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  );
};

beforeEach(() => {
  global.fetch = vi.fn((url) =>
    Promise.resolve({
      json: () =>
        Promise.resolve(/(allProducts|popularInWomen|newCollections)/.test(String(url)) ? products : []),
    })
  );
});

afterEach(() => {
  vi.resetAllMocks();
  window.history.pushState({}, "", "/");
});

test("renders the shop navigation, footer and products", async () => {
  renderApp("/");

  expect(screen.getByRole("link", { name: "Man" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Women" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Kids" })).toBeInTheDocument();
  expect(screen.getAllByText("SHOPPER")).not.toHaveLength(0);
  expect(await screen.findAllByText("Test Product")).not.toHaveLength(0);
});

test("renders a product page from /product/:productId", async () => {
  renderApp("/product/2");

  expect(await screen.findByRole("heading", { name: "Test Product" })).toBeInTheDocument();
});

test("shows a friendly message for an unknown product id", async () => {
  renderApp("/product/999");

  expect(await screen.findByText(/product not found/i)).toBeInTheDocument();
});
