const prefixRoute = 'https://music-land-api.herokuapp.com';
export const ApiEndpoints = {
  AuthEndpoints: {
    register: `${prefixRoute}/auth/register`,
    emailVerify: `${prefixRoute}/auth/email/verify`,
    google: `${prefixRoute}/auth/google`,
    sendEmailVerification: `${prefixRoute}/auth/email/send-email-verification`,
    googleCallback: `${prefixRoute}/auth/google/callback`,
    facebook: `${prefixRoute}/auth/facebook`,
    facebookCallback: `${prefixRoute}/facebook/callback`,
    loginUser: `${prefixRoute}/auth/login/user`,
    loginAdmin: `${prefixRoute}/auth/login/admin`,
    emailForgotPassword: `${prefixRoute}/auth/email/forgot-password`,
    emailResetPassword: `${prefixRoute}/auth/email/reset-password`,
    userMainData: `${prefixRoute}/auth/user-main-data`,
    users: `${prefixRoute}/auth/users`,
    checkUserName: `${prefixRoute}/auth/check-username`,
  },
  ProfileEndpoints: {
    userProfile: `${prefixRoute}/profiles/user-profile`,
    setProfileImage: `${prefixRoute}/profiles/user-profile/set-profile-image`,
    changeProfileImage: `${prefixRoute}/profiles/user-profile/change-profile-image`,
    editProfile: `${prefixRoute}/profiles/user-profile/edit-profile`,
    deleteProfileImage: `${prefixRoute}/profiles/user-profile/delete-profile-image`
  },
  FavoriteListEndpoints: {
    userFavoriteList: `${prefixRoute}/favorite-lists`
  },
  PlaylistEndpoints: {
    rootPlaylist: `${prefixRoute}/playlists`,
    userPlaylists: `${prefixRoute}/playlists/user-playlists`,
    newPlaylist: `${prefixRoute}/playlists/new-playlist`,
  },
  MusicEndpoints: {
    allMusics: `${prefixRoute}/musics`,
    filteredMusics: `${prefixRoute}/musics/filtered`,
    limitedMusics: `${prefixRoute}/musics/limited`,
  },
  MusicianEndpoints: {
    allMusicians: `${prefixRoute}/musicians`,
    filteredMusicians: `${prefixRoute}/musicians/filtered`,
    limitedMusicians: `${prefixRoute}/musicians/limited`,
  },
  MusiciansAlbumsEndpoints: {
    allMusiciansAlbums: `${prefixRoute}/musicians-albums`
  },
  SongEndpoints: {
    allSongs: `${prefixRoute}/songs`,
    filteredSongs: `${prefixRoute}/songs/filtered`,
    limitedSongs: `${prefixRoute}/songs/limited`,
  },
  SingersEndpoints: {
    allSingers: `${prefixRoute}/singers`,
    filteredSingers: `${prefixRoute}/singers/filtered`,
    limitedSingers: `${prefixRoute}/singers/limited`,
  },
  SingersAlbumsEndpoints: {
    allSingersAlbums: `${prefixRoute}/singers-albums`
  },
  RoomEndpoints: {
    userRooms: `${prefixRoute}/rooms/user-rooms`,
    rootRooms: `${prefixRoute}/rooms`
  },
  vapidKeys: {
    publicKey: 'publicKey',
    privateKey: 'privateKey'
  },
  NotificationEndpoints: {
    subscribers: `${prefixRoute}/notifications/subscribers`,
    subscriberNotifications: `${prefixRoute}/notifications/subscribers/subscriber-notifications`,
    newSubscriber: `${prefixRoute}/notifications/subscribers/new`
  }
};
