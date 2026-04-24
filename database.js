/* 
    Database to store user emails and passwords
*/

const UserDatabase = (() => {
    const STORAGE_KEY = 'eagleMapsUsers';
    const ALLOWED_DOMAINS = ['unt.edu', 'my.unt.edu'];

    function getUsers() {
        const savedUsers = localStorage.getItem(STORAGE_KEY);
        return savedUsers ? JSON.parse(savedUsers) : [];
    }

    function saveUsers(users) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    function normalizeEmail(email) {
        return email.trim().toLowerCase();    
    }

    function isCollegeEmail(email) {
        const cleanEmail = normalizeEmail(email);
        return ALLOWED_DOMAINS.some(domain => cleanEmail.endsWith(`@${domain}`));
    }

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    async function registerUser(email, password) {
        const cleanEmail = normalizeEmail(email);
        const cleanPassword = password.trim();

        if (!cleanEmail || !cleanPassword) {
            return { success: false, message: 'Please fill in the following fields: email and password...'};
        }

        if (!isCollegeEmail(cleanEmail)) {
            return { success: false, message: 'Please use a UNT email address...'};
        }

        const users = getUsers();
        const existingUser = users.find(user => user.email === cleanEmail);

        if (existingUser) {
            return { success: false, message: 'That email has aleady been registered with an account...'};
        }

        const hashedPassword = await hashPassword(cleanPassword);

        users.push({
            email: cleanEmail,
            passwordHash: hashedPassword,
            createdAt: new Date().toISOString()
        });

        saveUsers(users);
        return { success: true, message: 'Account has been created successfully!' };
    }

    async function loginUser(email, password) {
        const cleanEmail = normalizeEmail(email);
        const cleanPassword = password.trim();

        if (!cleanEmail || !cleanPassword) {
            return { success: false, message: 'Please fill in the following fields: email and password...' };
        }

        const users = getUsers();
        const user = users.find(savedUser => savedUser.email === cleanEmail);

        if (!user) {
            return { success: false, message: 'That email is not registered with an account...' };
        }

        const hashedPassword = await hashPassword(cleanPassword);

        if (user.passwordHash !== hashedPassword) {
            return { success: false, message: 'Incorrect password...' };
        }

        localStorage.setItem('eagleMapsCurrentUser', cleanEmail);
        return { success: true, message: 'Successful login!' };
    }

    function getCurrentUser() {
        return localStorage.getItem('eagleMapsCurrentUser');
    }

    function logoutUser() {
        localStorage.removeItem('eagleMapsCurrentUser');
    }

    return {
        getUsers,
        registerUser,
        loginUser,
        isCollegeEmail,
        getCurrentUser,
        logoutUser
    };
})();
