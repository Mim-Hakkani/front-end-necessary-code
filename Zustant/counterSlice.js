const counterSlice = (set) => ({
    count: 10,
    addCount: (num) => set((state) => ({ count: state.count + num }), false, "counterSlice/addCount"),
  });
  
  export default counterSlice;