export const USER_FLAGS = await fetch("https://github.com/LewisTehMinerz/discord-flags/raw/master/flags/user.json")
  .then(res => res.json())
  .then(res =>
    Object.entries(res).map(([flag, { description, undocumented, shift }]) => ({
      flag,
      description,
      undocumented,
      value: 1n << BigInt(shift)
    }))
  );