import Profile from "../types/Profile";

export default function validateProfile(profile: Profile) {
    const { username, tagline, body } = profile;
    if ( username && username.length > 100 ) {
        throw Error("Username too long");
    }
    if ( tagline && tagline.length > 500 ) {
        throw Error("Tagline too long");
    }
    if ( body && body.length > 3000 ) {
        throw Error("Body too long");
    }
}