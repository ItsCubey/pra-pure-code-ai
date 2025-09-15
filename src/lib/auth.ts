import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

// User subscription plans
export type PlanType = 'free' | 'basic' | 'pro';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  plan: PlanType;
  planLimits: {
    requestsPerDay: number;
    teamMembers: number;
    projectsPerMonth: number;
  };
  usage: {
    requestsToday: number;
    projectsThisMonth: number;
    teamMembersCount: number;
  };
  createdAt: any;
  lastLoginAt: any;
}

// Plan configurations
export const PLAN_LIMITS = {
  free: {
    requestsPerDay: 10,
    teamMembers: 2,
    projectsPerMonth: 2,
    price: 0
  },
  basic: {
    requestsPerDay: 50,
    teamMembers: 10,
    projectsPerMonth: 5,
    price: 10
  },
  pro: {
    requestsPerDay: 200,
    teamMembers: 50,
    projectsPerMonth: 15,
    price: 25
  }
};

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export class AuthService {
  // Email/Password Authentication
  async signUpWithEmail(email: string, password: string, displayName: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName });

    // Create user profile in Firestore
    await this.createUserProfile(user, 'free');

    return user;
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await this.updateLastLogin(userCredential.user.uid);
    return userCredential.user;
  }

  // Social Authentication
  async signInWithGoogle(): Promise<User> {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Check if this is a new user
    const userProfile = await this.getUserProfile(user.uid);
    if (!userProfile) {
      await this.createUserProfile(user, 'free');
    } else {
      await this.updateLastLogin(user.uid);
    }

    return user;
  }

  async signInWithGithub(): Promise<User> {
    const userCredential = await signInWithPopup(auth, githubProvider);
    const user = userCredential.user;

    // Check if this is a new user
    const userProfile = await this.getUserProfile(user.uid);
    if (!userProfile) {
      await this.createUserProfile(user, 'free');
    } else {
      await this.updateLastLogin(user.uid);
    }

    return user;
  }

  // Sign out
  async signOut(): Promise<void> {
    await signOut(auth);
  }

  // User profile management
  async createUserProfile(user: User, plan: PlanType = 'free'): Promise<void> {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || undefined,
      plan,
      planLimits: PLAN_LIMITS[plan],
      usage: {
        requestsToday: 0,
        projectsThisMonth: 0,
        teamMembersCount: 1
      },
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  }

  async updateLastLogin(uid: string): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
  }

  async updateUserPlan(uid: string, plan: PlanType): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      plan,
      planLimits: PLAN_LIMITS[plan]
    }, { merge: true });
  }

  // Usage tracking
  async incrementRequestUsage(uid: string): Promise<boolean> {
    const userProfile = await this.getUserProfile(uid);
    if (!userProfile) return false;

    const newRequestCount = userProfile.usage.requestsToday + 1;
    
    // Check if user has exceeded their daily limit
    if (newRequestCount > userProfile.planLimits.requestsPerDay) {
      return false; // Usage limit exceeded
    }

    // Update usage
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      'usage.requestsToday': newRequestCount
    }, { merge: true });

    return true; // Usage incremented successfully
  }

  // Auth state observer
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}

// Create singleton instance
export const authService = new AuthService();