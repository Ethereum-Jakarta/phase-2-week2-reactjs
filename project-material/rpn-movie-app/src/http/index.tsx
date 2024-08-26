import ky from "ky"

export const httpClient = ky.extend({
  prefixUrl: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjY4YjdlYzI1NTc4MWFiMzFhNTYxMzMzYjU3ZmFhYSIsIm5iZiI6MTcyMTY0Mjg4Mi42MjEwNDIsInN1YiI6IjY2OWUyNzdkYjU3M2VmMjcxMGYzNzNjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CiRV3vsU0K6QkphkefAOG7Y9aeLn3W4ks50DCCkcaW0",
  },
})
