import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import AddEducation from "./AddEducation";
import AddSkill from "./AddSkill";

test("renders Resume Builder heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Resume Builder/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders Add Education button", () => {
  render(<App />);
  expect(screen.getByText(/Add Education/i)).toBeInTheDocument();
});

test("renders Add Skill button", () => {
  render(<App />);
  expect(screen.getByText(/Add Skill/i)).toBeInTheDocument();
});

test("clicking Add Education shows education form", () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Add Education/i));
  expect(screen.getByText(/Add New Education/i)).toBeInTheDocument();
});

test("clicking Add Skill shows skill form", () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Add Skill/i));
  expect(screen.getByText(/Add New Skill/i)).toBeInTheDocument();
});

test("AddEducation renders all required fields", () => {
  render(<AddEducation onBack={() => {}} />);
  expect(screen.getByLabelText(/Course/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/School/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Grade/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Logo URL/i)).toBeInTheDocument();
});

test("AddSkill renders all required fields", () => {
  render(<AddSkill onBack={() => {}} />);
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Proficiency/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Logo URL/i)).toBeInTheDocument();
});

test("AddEducation Cancel button calls onBack", () => {
  const onBack = jest.fn();
  render(<AddEducation onBack={onBack} />);
  fireEvent.click(screen.getByText(/Cancel/i));
  expect(onBack).toHaveBeenCalledTimes(1);
});

test("AddSkill Cancel button calls onBack", () => {
  const onBack = jest.fn();
  render(<AddSkill onBack={onBack} />);
  fireEvent.click(screen.getByText(/Cancel/i));
  expect(onBack).toHaveBeenCalledTimes(1);
});
