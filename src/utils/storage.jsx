// USER
export const getUserFromStorage = () => {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
};

export const saveUserToStorage = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem("currentUser");
};

// USERS (liste de tous les utilisateurs)
export const getUsersFromStorage = () => {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

export const saveUsersToStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const getTasksFromStorage = () => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
};

export const saveTasksToStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const removeTasksFromStorage = () => {
  localStorage.removeItem("tasks");
};