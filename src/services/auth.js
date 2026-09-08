const USERS_KEY = 'todo_users';
const CURRENT_USER_KEY = 'todo_current_user';

export function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

export function registerUser(username, password) {
  const users = getUsers();
  const existingUser = users.find(user => user.username === username.toLowerCase());
    if (existingUser) {
        return { success: false, message: 'This username already exists' };
    };
    const newUser = { 
        id: Date.now(),
        username: username.toLowerCase(),
        password: password
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, message: 'User registered successfully', user: newUser };
}

export function loginUser(username, password) {
  const users = getUsers();
  const user = users.find(user => user.username === username.toLowerCase() && user.password === password);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ id: user.id, username: user.username }));
    return { success: true, message: 'Login successful', user };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser() {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  return currentUser ? JSON.parse(currentUser) : null;
}

export function isLoggedIn() {
  return !!getCurrentUser();
}