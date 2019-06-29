/**
 * Example haxroomie configuration file.
 * Opens 1 public and 1 private room.
 * 
 * Copy this to the haxroomie directory and edit to your liking to
 * easily get haxroomie running.
 * 
 * CHANGE THE admin PASSWORD!!!
 */

let config = {
  'pub': {
    autoStart: true,
    roomName: `PRO 3v3 1`,
    playerName: `host`,
    maxPlayers: 10,
    public: true,
    repositories: [
      {
        type: `github`,
        repository: `morko/hhm-sala-plugins`
      }
    ],
    pluginConfig: {
      'sav/roles': {
        roles: {
          // get admin priviledges with !auth admin adminpass
          admin: `adminpass`,
          // get host priviledges with !auth host hostpass
          host: `hostpass`
        }
      },
      // spam protection
      'hr/spam': {},
      // ensures room always has an admin
      'hr/always-one-admin': {}
    }
  },
  'priv': {
    autoStart: true,
    roomName: `fs arena`,
    playerName: `host`,
    maxPlayers: 20,
    public: false,
    pluginConfig: {
      'sav/roles': {
        roles: {
          // get admin priviledges with !auth admin adminpass
          admin: `adminpass`,
          // get host priviledges with !auth host hostpass
          host: `hostpass`
        }
      },
    }
  }
};
module.exports = config;