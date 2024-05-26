const continentsSlice = (set) => ({
    continents:null,
    setContinents: (continents) => set({continents}, false, "continentsSlice/setContinents"),
  });
  
  export default continentsSlice;