import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import UserInformation from "./UserInformation";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({}) })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders Resume Builder heading", () => {
  render(<App />);
  expect(screen.getByText(/Resume Builder/i)).toBeInTheDocument();
});

test("renders user information form when no existing info", () => {
  render(<UserInformation userInfo={null} onSave={() => {}} />);
  expect(screen.getByText(/Your Information/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
});

test("displays existing user info when provided", () => {
  const info = { name: "Jane Doe", email: "jane@example.com", phone: "+1 555 000 0000" };
  render(<UserInformation userInfo={info} onSave={() => {}} />);
  expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  expect(screen.getByText("+1 555 000 0000")).toBeInTheDocument();
});

test("clicking Edit Info switches to edit form", () => {
  const info = { name: "Jane Doe", email: "jane@example.com", phone: "+1 555 000 0000" };
  render(<UserInformation userInfo={info} onSave={() => {}} />);
  fireEvent.click(screen.getByText(/Edit Info/i));
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
});

test("name field pre-filled when editing existing info", () => {
  const info = { name: "Jane Doe", email: "jane@example.com", phone: "+1 555 000 0000" };
  render(<UserInformation userInfo={info} onSave={() => {}} />);
  fireEvent.click(screen.getByText(/Edit Info/i));
  expect(screen.getByLabelText(/Name/i).value).toBe("Jane Doe");
});

test("phone field enforces international format pattern", () => {
  render(<UserInformation userInfo={null} onSave={() => {}} />);
  const phoneInput = screen.getByLabelText(/Phone/i);
  expect(phoneInput).toHaveAttribute("pattern");
  expect(phoneInput.getAttribute("pattern")).toContain("\\+");
});

test("UserInformation form submits and calls onSave", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({ id: 1 }) })
  );
  const onSave = jest.fn();
  render(<UserInformation userInfo={null} onSave={onSave} />);

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John" } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
  fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: "+1 555 000 0000" } });
  fireEvent.click(screen.getByText(/Save/i));

  await screen.findByText("John");
  expect(onSave).toHaveBeenCalledWith({
    name: "John",
    email: "john@example.com",
    phone: "+1 555 000 0000",
  });
});
