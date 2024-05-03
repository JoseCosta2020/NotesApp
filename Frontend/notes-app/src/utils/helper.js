export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
    return regex.test(email);
};

export const getInitials = (email) => {
    if (!email) return "";

    let initials = "";
    
    for (let i = 0; i< Math.min(email.length, 2); i++ ) {
        initials += email[i];
    }
    return initials.toUpperCase()
}