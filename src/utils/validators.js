export const validateUniversityEmail = (email) => {
  return (
    email.endsWith("@student.ptuk.edu") ||
    email.endsWith("@supervisor.ptuk.edu")
  );
};