import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import EditExperience from "./EditExperience";
import EditEducation from "./EditEducation";
import EditSkill from "./EditSkill";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders Resume Builder heading", () => {
  render(<App />);
  expect(screen.getByText(/Resume Builder/i)).toBeInTheDocument();
});

test("renders Add Experience button", () => {
  render(<App />);
  expect(screen.getByText(/Add Experience/i)).toBeInTheDocument();
});

test("shows empty state messages when no data", async () => {
  render(<App />);
  expect(
    await screen.findByText(/No experience added yet/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/No education added yet/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/No skills added yet/i)
  ).toBeInTheDocument();
});

test("displays fetched experiences with Edit buttons", async () => {
  global.fetch = jest.fn((url) => {
    if (url === "/resume/experience") {
      return Promise.resolve({
        json: () =>
          Promise.resolve([{ title: "Engineer", company: "Acme", start_date: "2020", end_date: "2021", description: "Work", logo: "" }]),
      });
    }
    return Promise.resolve({ json: () => Promise.resolve([]) });
  });

  render(<App />);
  expect(await screen.findByText(/Engineer/i)).toBeInTheDocument();
  expect(screen.getByText(/Edit/i)).toBeInTheDocument();
});

test("clicking Edit on experience shows edit form", async () => {
  global.fetch = jest.fn((url) => {
    if (url === "/resume/experience") {
      return Promise.resolve({
        json: () =>
          Promise.resolve([{ title: "Engineer", company: "Acme", start_date: "2020", end_date: "2021", description: "Work", logo: "" }]),
      });
    }
    return Promise.resolve({ json: () => Promise.resolve([]) });
  });

  render(<App />);
  const editBtn = await screen.findByText(/Edit/i);
  fireEvent.click(editBtn);
  expect(screen.getByText(/Edit Experience/i)).toBeInTheDocument();
});

test("EditExperience renders all required fields pre-filled", () => {
  const exp = { title: "Dev", company: "Corp", start_date: "2020", end_date: "2022", description: "Stuff", logo: "" };
  render(<EditExperience experience={exp} index={0} onBack={() => {}} />);
  expect(screen.getByLabelText(/Title/i).value).toBe("Dev");
  expect(screen.getByLabelText(/Company/i).value).toBe("Corp");
  expect(screen.getByLabelText(/Start Date/i).value).toBe("2020");
  expect(screen.getByLabelText(/End Date/i).value).toBe("2022");
});

test("EditEducation renders all required fields pre-filled", () => {
  const edu = { course: "CS", school: "MIT", start_date: "2018", end_date: "2022", grade: "A", logo: "" };
  render(<EditEducation education={edu} index={0} onBack={() => {}} />);
  expect(screen.getByLabelText(/Course/i).value).toBe("CS");
  expect(screen.getByLabelText(/School/i).value).toBe("MIT");
  expect(screen.getByLabelText(/Grade/i).value).toBe("A");
});

test("EditSkill renders all required fields pre-filled", () => {
  const skill = { name: "JavaScript", proficiency: "Expert", logo: "" };
  render(<EditSkill skill={skill} index={0} onBack={() => {}} />);
  expect(screen.getByLabelText(/Name/i).value).toBe("JavaScript");
  expect(screen.getByLabelText(/Proficiency/i).value).toBe("Expert");
});

test("EditExperience Cancel calls onBack", () => {
  const onBack = jest.fn();
  const exp = { title: "", company: "", start_date: "", end_date: "", description: "", logo: "" };
  render(<EditExperience experience={exp} index={0} onBack={onBack} />);
  fireEvent.click(screen.getByText(/Cancel/i));
  expect(onBack).toHaveBeenCalledTimes(1);
});

test("EditEducation Cancel calls onBack", () => {
  const onBack = jest.fn();
  const edu = { course: "", school: "", start_date: "", end_date: "", grade: "", logo: "" };
  render(<EditEducation education={edu} index={0} onBack={onBack} />);
  fireEvent.click(screen.getByText(/Cancel/i));
  expect(onBack).toHaveBeenCalledTimes(1);
});

test("EditSkill Cancel calls onBack", () => {
  const onBack = jest.fn();
  const skill = { name: "", proficiency: "", logo: "" };
  render(<EditSkill skill={skill} index={0} onBack={onBack} />);
  fireEvent.click(screen.getByText(/Cancel/i));
  expect(onBack).toHaveBeenCalledTimes(1);
});
