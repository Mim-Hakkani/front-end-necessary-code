// npm install react-native-dynamic



// **************************  HeavyComponent.js **************************


// import React from 'react';
// import { View, Text } from 'react-native';

// const HeavyComponent = () => {
//   return (
//     <View>
//       <Text>This is a heavy component!</Text>
//     </View>
//   );
// };

// export default HeavyComponent;

   

//******************************* MainComponent.js **********************//



// import React, { useState } from 'react';
// import { View, Button } from 'react-native';
// import dynamic from 'react-native-dynamic';

// const HeavyComponent = dynamic(() => import('./HeavyComponent'));

// const MainComponent = () => {
//   const [showComponent, setShowComponent] = useState(false);

//   return (
//     <View>
//       <Button title="Load Heavy Component" onPress={() => setShowComponent(true)} />
//       {showComponent && <HeavyComponent />}
//     </View>
//   );
// };

// export default MainComponent;

// ********************************** Important Note **********************

// [Note : In Short Where Conditionaly render any component this component is used  lazy loading ]
