import Player from "./player";

const STORAGRE_USERS_KEY = "MSB_USERS";
const STORAGRE_SELECTEDPLAYER_KEY = "MSB_SELECTEDPLAYER";
const STORAGRE_PASSEDPLAYERCOUNT_KEY = "MSB_PASSEDPLAYERCOUNT";

export const savePlayersStorage = (playres) => {
  localStorage.setItem(STORAGRE_USERS_KEY, JSON.stringify(playres.map((player) => player.toJson())));
};
export const loadPlayersStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGRE_USERS_KEY) || "[]").map(
    (json) => new Player(json.name || json, { ...json })
  );
};

export const saveSelectedPlayerStorage = (index) => {
  localStorage.setItem(STORAGRE_SELECTEDPLAYER_KEY, JSON.stringify(index || 0));
};
export const loadSelectedPlayerStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGRE_SELECTEDPLAYER_KEY) || "0");
};

export const savePassedPlayerCountStorage = (count) => {
  localStorage.setItem(STORAGRE_PASSEDPLAYERCOUNT_KEY, JSON.stringify(count || 0));
};
export const loadPassedPlayerCountStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGRE_PASSEDPLAYERCOUNT_KEY) || "0");
};
