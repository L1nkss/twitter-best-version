export interface FirebaseUser {
  displayName: string
  email: string
  emailVerified: boolean
  photoURL: string
  reloadUserInfo: {
    createdAt: string
    displayName: string
    email: string
    emailVerified: boolean
    photoURL: string
    lastLoginAt: string
    lastRefreshAt: Date
  }
  uid: string
}
