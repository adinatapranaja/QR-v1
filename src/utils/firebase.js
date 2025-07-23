// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider, 
    signOut,
    onAuthStateChanged 
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    serverTimestamp
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsughQSmvF2OBsNHm3CmIzU69KbdbTKPY",
    authDomain: "any-qr-event.firebaseapp.com",
    projectId: "any-qr-event",
    storageBucket: "any-qr-event.firebasestorage.app",
    messagingSenderId: "821048253866",
    appId: "1:821048253866:web:46d14e498b136605e65fd3",
    measurementId: "G-90M4W8NDX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Auth functions
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signInWithEmail = (email, password) => 
    signInWithEmailAndPassword(auth, email, password);

export const createUserWithEmail = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const onAuthStateChange = (callback) => onAuthStateChanged(auth, callback);

// User Management Functions
export const createUserProfile = async (user, additionalData = {}) => {
    if (!user) return;
    
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
        const { displayName, email } = user;
        const createdAt = serverTimestamp();
        
        try {
            await setDoc(userRef, {
                displayName: displayName || additionalData.displayName || 'User',
                email,
                role: additionalData.role || 'client', // Default role
                createdAt,
                updatedAt: createdAt,
                ...additionalData
            });
        } catch (error) {
            console.error('Error creating user profile:', error);
            throw error;
        }
    }
    
    return userRef;
};

export const getUserProfile = async (uid) => {
    if (!uid) return null;
    
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            return { id: userSnap.id, ...userSnap.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (uid, data) => {
    if (!uid) return;
    
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

// Event Management Functions
export const createEvent = async (eventData, creatorUid) => {
    if (!creatorUid) throw new Error('Creator UID is required');
    
    try {
        const eventsRef = collection(db, 'events');
        const newEvent = {
            ...eventData,
            creatorUid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            status: eventData.status || 'draft',
            totalAttendees: 0,
            checkedInCount: 0
        };
        
        const docRef = await addDoc(eventsRef, newEvent);
        return { id: docRef.id, ...newEvent };
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

export const getEvents = async (creatorUid = null) => {
    try {
        const eventsRef = collection(db, 'events');
        let q;
        
        if (creatorUid) {
            q = query(eventsRef, where('creatorUid', '==', creatorUid), orderBy('createdAt', 'desc'));
        } else {
            q = query(eventsRef, orderBy('createdAt', 'desc'));
        }
        
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting events:', error);
        throw error;
    }
};

export const getEvent = async (eventId) => {
    if (!eventId) return null;
    
    try {
        const eventRef = doc(db, 'events', eventId);
        const eventSnap = await getDoc(eventRef);
        
        if (eventSnap.exists()) {
            return { id: eventSnap.id, ...eventSnap.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting event:', error);
        throw error;
    }
};

export const updateEvent = async (eventId, eventData) => {
    if (!eventId) return;
    
    try {
        const eventRef = doc(db, 'events', eventId);
        await updateDoc(eventRef, {
            ...eventData,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

export const deleteEvent = async (eventId) => {
    if (!eventId) return;
    
    try {
        // Delete all attendees for this event first
        const attendeesRef = collection(db, 'attendees');
        const attendeesQuery = query(attendeesRef, where('eventId', '==', eventId));
        const attendeesSnapshot = await getDocs(attendeesQuery);
        
        const deletePromises = attendeesSnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        
        // Delete the event
        const eventRef = doc(db, 'events', eventId);
        await deleteDoc(eventRef);
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};

// Attendee Management Functions
export const createAttendee = async (attendeeData) => {
    if (!attendeeData.eventId) throw new Error('Event ID is required');
    
    try {
        const attendeesRef = collection(db, 'attendees');
        const newAttendee = {
            ...attendeeData,
            checkedIn: false,
            checkedInAt: null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        
        const docRef = await addDoc(attendeesRef, newAttendee);
        
        // Update event attendee count
        const eventRef = doc(db, 'events', attendeeData.eventId);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
            const currentCount = eventSnap.data().totalAttendees || 0;
            await updateDoc(eventRef, {
                totalAttendees: currentCount + 1,
                updatedAt: serverTimestamp()
            });
        }
        
        return { id: docRef.id, ...newAttendee };
    } catch (error) {
        console.error('Error creating attendee:', error);
        throw error;
    }
};

export const getAttendees = async (eventId) => {
    if (!eventId) return [];
    
    try {
        const attendeesRef = collection(db, 'attendees');
        const q = query(
            attendeesRef, 
            where('eventId', '==', eventId),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting attendees:', error);
        throw error;
    }
};

export const checkInAttendee = async (attendeeId, eventId) => {
    if (!attendeeId) return;
    
    try {
        const attendeeRef = doc(db, 'attendees', attendeeId);
        await updateDoc(attendeeRef, {
            checkedIn: true,
            checkedInAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        
        // Update event checked-in count
        if (eventId) {
            const eventRef = doc(db, 'events', eventId);
            const eventSnap = await getDoc(eventRef);
            if (eventSnap.exists()) {
                const currentCount = eventSnap.data().checkedInCount || 0;
                await updateDoc(eventRef, {
                    checkedInCount: currentCount + 1,
                    updatedAt: serverTimestamp()
                });
            }
        }
    } catch (error) {
        console.error('Error checking in attendee:', error);
        throw error;
    }
};

// Real-time listeners
export const onEventsSnapshot = (callback, creatorUid = null) => {
    const eventsRef = collection(db, 'events');
    let q;
    
    if (creatorUid) {
        q = query(eventsRef, where('creatorUid', '==', creatorUid), orderBy('createdAt', 'desc'));
    } else {
        q = query(eventsRef, orderBy('createdAt', 'desc'));
    }
    
    return onSnapshot(q, (snapshot) => {
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(events);
    });
};

export const onAttendeesSnapshot = (eventId, callback) => {
    if (!eventId) return () => {};
    
    const attendeesRef = collection(db, 'attendees');
    const q = query(
        attendeesRef, 
        where('eventId', '==', eventId),
        orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
        const attendees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(attendees);
    });
};

// Analytics Functions
export const getEventStats = async (eventId) => {
    if (!eventId) return null;
    
    try {
        const event = await getEvent(eventId);
        const attendees = await getAttendees(eventId);
        
        const totalAttendees = attendees.length;
        const checkedInAttendees = attendees.filter(a => a.checkedIn).length;
        const attendanceRate = totalAttendees > 0 ? (checkedInAttendees / totalAttendees) * 100 : 0;
        
        return {
            event,
            totalAttendees,
            checkedInAttendees,
            pendingAttendees: totalAttendees - checkedInAttendees,
            attendanceRate: Math.round(attendanceRate * 100) / 100,
            attendees
        };
    } catch (error) {
        console.error('Error getting event stats:', error);
        throw error;
    }
};

// Export auth and db for direct use
export { auth, db, googleProvider };

// Default export with all functions
export default {
    auth,
    db,
    signInWithGoogle,
    signInWithEmail,
    createUserWithEmail,
    logout,
    onAuthStateChange,
    createUserProfile,
    getUserProfile,
    updateUserProfile,
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    createAttendee,
    getAttendees,
    checkInAttendee,
    onEventsSnapshot,
    onAttendeesSnapshot,
    getEventStats
};